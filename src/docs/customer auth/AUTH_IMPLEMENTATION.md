# Authentication Implementation

This project now includes a complete customer authentication system following the backend API documentation.

## Features Implemented

### 1. User Registration (Sign Up)
- ✅ Form with validation (name, phone_number, email, password, password_confirmation)
- ✅ Email verification flow
- ✅ Error handling for duplicate emails and validation errors
- ✅ Email verification pending page with instructions
- ✅ Google OAuth integration

### 2. Email Verification
- ✅ Email verification page at `/auth/verify-email`
- ✅ Token-based verification from email link
- ✅ Auto-login after successful verification
- ✅ Cart sync after verification
- ✅ Error handling for invalid/expired tokens

### 3. User Login (Sign In)
- ✅ Form with email and password
- ✅ Proper error handling for:
  - Invalid credentials (401)
  - Unverified email (403)
  - Inactive account (403)
- ✅ Token storage and user state management
- ✅ Cart sync after login
- ✅ Google OAuth integration

### 4. Google OAuth
- ✅ OAuth callback page at `/oauth-success`
- ✅ Token extraction from URL parameters
- ✅ Cart sync after OAuth login
- ✅ Error handling for OAuth failures
- ✅ Configurable vendor ID

## File Structure

```
src/
├── auth/
│   ├── view/
│   │   ├── sign-up-view.jsx          # Registration form with email verification pending UI
│   │   ├── sign-in-view.jsx          # Login form with enhanced error handling
│   │   ├── oauth-success-view.jsx    # OAuth callback handler
│   │   └── email-verification-view.jsx # Email verification page
│   └── components/
│       └── google-auth.jsx           # Google OAuth button
├── api/
│   ├── auth.js                       # Auth API functions (signUp, signIn, verifyEmail)
│   └── endpoints.js                  # API endpoint definitions
├── app/
│   └── auth/
│       ├── sign-in/page.jsx
│       ├── sign-up/page.jsx
│       ├── verify-email/page.jsx     # New email verification page
│       └── oauth-success/page.jsx
└── global-config.js                  # Added vendorId configuration
```

## Configuration

### Environment Variables

Create a `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_SERVER_URL=https://your-api-domain.com/api/
NEXT_PUBLIC_ASSETS_DIR=https://your-api-domain.com/
NEXT_PUBLIC_VENDOR_ID=your_vendor_id
```

### Global Config

The `vendorId` is used for Google OAuth and is configured in `src/global-config.js`:

```javascript
vendorId: process.env.NEXT_PUBLIC_VENDOR_ID ?? "1"
```

## API Response Handling

### Registration Response
```json
{
  "status": 200,
  "success": true,
  "message": "Registration successful. Please check your email for verification link.",
  "data": null
}
```

### Login Response
```json
{
  "status": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "1|abc123xyz...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "party": {
        "full_name": "John Doe",
        "phone_number": "9812345678"
      }
    }
  }
}
```

## Error Handling

The implementation handles all error cases specified in the documentation:

### Sign Up Errors
- **400**: Email already registered / Pending verification
- **422**: Validation errors (displayed inline)

### Sign In Errors
- **401**: Invalid credentials
- **403**: Email not verified / Account inactive

### Email Verification Errors
- **400**: Invalid or expired token / Already verified

## User Flow

### Registration Flow
1. User fills registration form
2. Form validates client-side
3. API request sent to `/api/frontend/user/register`
4. Success: Shows email verification pending page
5. User checks email and clicks verification link
6. Redirected to `/auth/verify-email?token=xxx`
7. Token verified automatically
8. User logged in and redirected to home

### Login Flow
1. User fills login form
2. API request sent to `/api/frontend/user/login`
3. Success: Token stored, user data saved to Redux
4. Cart items synced with server
5. User redirected to previous page or home

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Redirected to `/api/frontend/user/vendor/{vendorId}/google/redirect`
3. Google consent screen shown
4. After approval, redirected to `/oauth-success?token=xxx&customer_id=xxx`
5. Token stored, cart synced
6. User redirected to home

## State Management

### Redux State Structure
```javascript
{
  auth: {
    isLogin: boolean,
    user: {
      id: number,
      email: string,
      party: {
        full_name: string,
        phone_number: string
      }
    },
    userToken: string
  }
}
```

### Actions
- `setUser({ token, customer })` - Set user and token after login
- `setUserToken(token)` - Set token only (OAuth)
- `clearUser()` - Clear user data on logout

## Security Features

- ✅ Password validation (min 8 characters)
- ✅ Password confirmation matching
- ✅ Email format validation
- ✅ Phone number format validation (10 digits)
- ✅ Token-based authentication
- ✅ Vendor header required for all requests
- ✅ Error messages don't expose sensitive information

## Testing

### Test Registration
1. Navigate to `/auth/sign-up`
2. Fill all fields with valid data
3. Check that email verification pending page shows
4. Check email for verification link

### Test Login
1. Navigate to `/auth/sign-in`
2. Try with unverified email → Should show verification error
3. Try with wrong password → Should show invalid credentials
4. Try with verified account → Should login successfully

### Test OAuth
1. Click "Sign in with Google" button
2. Complete Google consent
3. Should redirect to home with logged-in state

## Notes

- Phone number field renamed from `contact_info` to `phone_number` to match API
- Email verification is required before login
- Cart items are automatically synced after successful authentication
- OAuth callback handles error cases gracefully
- All responses follow the documented API structure

## Next Steps (Optional Enhancements)

- [ ] Implement "Resend verification email" functionality
- [ ] Add "Forgot password" flow
- [ ] Add "Change password" in profile
- [ ] Implement token refresh logic
- [ ] Add session timeout handling
- [ ] Add "Remember me" functionality
- [ ] Implement social login with other providers
