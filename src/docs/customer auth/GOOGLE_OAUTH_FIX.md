# Google OAuth "Code Already Used" Fix

## Problem

The error "This code has already been used. Please try again." occurs when OAuth authorization codes are being exchanged multiple times. OAuth codes are single-use tokens by design.

## Root Cause

There were **two conflicting Google OAuth implementations** in the codebase:

1. **`/oauth-success`** - Expects the backend to handle the complete OAuth flow and redirect with a `token` parameter
2. **`/auth/google/callback`** - Expects a `code` parameter and attempts to exchange it for a token via the `/user/google/exchange` API

### The Issue:

- According to the backend API documentation, the backend handles the **complete OAuth flow**
- After user consent, the backend exchanges the code with Google and redirects with a **token**
- If the frontend's redirect URI is `/auth/google/callback` and it tries to call `googleExchange(code)`, it causes a double exchange:
  1. Backend already exchanged the code → got token
  2. Frontend tries to exchange the same code again → **Error: code already used**

## Solution

Updated [google-callback-view.jsx](src/auth/view/google-callback-view.jsx) to handle both flows intelligently:

### Primary Flow (Recommended)

1. Backend redirects to `/auth/google/callback?token=xxx&customer_id=yyy`
2. Frontend detects the `token` parameter
3. Stores token and customer data directly
4. No code exchange needed ✅

### Fallback Flow (If needed)

1. Backend redirects with `code` parameter
2. Frontend calls `googleExchange(code)` API
3. Prevents duplicate exchanges with `hasProcessed` state

### Key Changes Made:

```javascript
// 1. Added duplicate execution prevention
const [hasProcessed, setHasProcessed] = useState(false);

// 2. Check for token first (primary flow)
const tokenParam = searchParams.get("token");
if (tokenParam) {
    // Use token directly - no code exchange needed
    dispatch(setUser({ ... }));
    return;
}

// 3. Only exchange code if no token provided (fallback)
const code = searchParams.get("code");
if (code) {
    const response = await googleExchange(code);
    // ...
}
```

## Backend Configuration Required

Ensure your backend's `vendor_google_redirect_uri` is set to:

```
https://your-domain.com/auth/google/callback
```

The backend should redirect with these parameters after successful OAuth:

```
/auth/google/callback?token={auth_token}&customer_id={customer_id}&message={success_message}
```

## Testing

1. Click "Sign in with Google"
2. Complete Google OAuth consent
3. Should redirect back without errors
4. User should be logged in successfully

## Files Modified

- [src/auth/view/google-callback-view.jsx](src/auth/view/google-callback-view.jsx) - Added token-first flow and duplicate prevention

## Additional Notes

- The `/oauth-success` route can be removed if not used
- The `googleExchange` API endpoint is kept as a fallback but should not normally be called
- The fix prevents the "code already used" error by checking for direct token delivery first
