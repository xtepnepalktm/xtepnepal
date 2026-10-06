
## Overview

This guide provides implementation guidelines for the customer authentication system including registration, email
verification, login, and OAuth integration.

---

## Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [API Endpoints](#api-endpoints)
3. [Registration Flow](#registration-flow)
4. [Email Verification Flow](#email-verification-flow)
5. [Login Flow](#login-flow)
6. [Google OAuth Flow](#google-oauth-flow)
7. [Protected Routes](#protected-routes)
8. [Error Handling](#error-handling)
9. [State Management](#state-management)

---

## Authentication Flow

### High-Level Flow

1. User visits registration/login page
2. User submits credentials
3. Backend processes request
4. For registration: Email verification required
5. For login: Token returned immediately
6. Token stored in frontend
7. Protected routes accessible with token

---

## API Endpoints

### Base URL

All frontend APIs use the base path: `/api/frontend/user`

### Required Headers

**All requests must include:**

```
Vendor: {vendor_api_token}
Accept: application/json
Content-Type: application/json
```

**Authenticated requests also require:**

```
Authorization: Bearer {user_token}
```

---

## Registration Flow

### Endpoint

**POST** `/api/frontend/user/register`

### Request Headers

```
Vendor: {vendor_api_token}
Accept: application/json
Content-Type: application/json
```

### Request Body

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone_number": "9812345678",
    "password": "SecurePass123",
    "password_confirmation": "SecurePass123"
}
```

### Validation Rules

- **name**: Required, string, max 255 characters
- **email**: Required, valid email format, max 255 characters
- **phone_number**: Required, string, max 255 characters
- **password**: Required, min 8 characters, must match confirmation
- **password_confirmation**: Required, must match password

### Success Response (200)

```json
{
    "status": 200,
    "success": true,
    "message": "Registration successful. Please check your email for verification link.",
    "data": null
}
```

### Error Responses

#### Validation Error (422)

```json
{
    "status": 422,
    "success": false,
    "message": "Validation failed",
    "data": {
        "email": [
            "The email field is required."
        ],
        "password": [
            "The password must be at least 8 characters."
        ]
    }
}
```

#### Email Already Registered (400)

```json
{
    "status": 400,
    "success": false,
    "message": "Email already registered. Please login instead.",
    "data": null
}
```

#### Pending Verification (400)

```json
{
    "status": 400,
    "success": false,
    "message": "You have already started signup. Please check your email for verification link.",
    "data": null
}
```

### Frontend Implementation Steps

1. **Create Registration Form**
    - Name input field
    - Email input field
    - Phone number input field
    - Password input field (with visibility toggle)
    - Confirm password input field
    - Terms & conditions checkbox (optional)
    - Submit button

2. **Form Validation (Client-Side)**
    - Validate all required fields before submission
    - Check email format
    - Verify password length (min 8 characters)
    - Confirm passwords match
    - Display inline validation errors

3. **Submit Registration**
    - Disable submit button during API call
    - Show loading indicator
    - Include Vendor header from environment/config
    - Make POST request to registration endpoint

4. **Handle Response**
    - **Success**:
        - Show success message
        - Redirect to email verification pending page
        - Display message: "Please check your email to verify your account"
    - **Error**:
        - Display error messages from API response
        - Re-enable form for corrections

5. **Email Verification Pending Page**
    - Show user's email address
    - Display instructions to check email
    - Provide "Resend verification email" option (if implemented)
    - Provide link to login page

---

## Email Verification Flow

### Endpoint

**GET** `/api/frontend/user/verify-email/{token}`

### URL Parameters

- **token**: Verification token from email link

### No Headers Required

This is a GET request accessed via email link - no special headers needed.

### Success Response (302 Redirect)

User is redirected to frontend with token in URL:

```
{frontend_url}?token={auth_token}&message=Email verified successfully
```

### Error Responses

#### Invalid/Expired Token (400)

```json
{
    "status": 400,
    "success": false,
    "message": "Invalid or expired verification link",
    "data": null
}
```

#### Already Verified (400)

```json
{
    "status": 400,
    "success": false,
    "message": "Email already verified. Please login.",
    "data": null
}
```

### Frontend Implementation Steps

1. **Email Template Considerations**
    - Backend sends email with verification link
    - Link format: `{backend_url}/api/frontend/user/verify-email/{token}`
    - Email should be branded with vendor details

2. **Create Verification Landing Page**
    - Parse URL parameters on page load
    - Extract `token` and `message` from query string
    - Handle both success and error scenarios

3. **Handle Verification Success**
    - Extract token from URL parameter
    - Store token in localStorage/sessionStorage
    - Set authentication state
    - Display success message: "Email verified successfully!"
    - Auto-redirect to dashboard/home after 2-3 seconds
    - OR show "Continue to Dashboard" button

4. **Handle Verification Errors**
    - Display error message if verification fails
    - Provide "Resend Verification Email" option
    - Provide "Back to Login" link
    - Clear any existing auth tokens

5. **Auto-Login After Verification**
    - Token is provided in redirect URL
    - Store token securely
    - Update authentication state
    - Initialize user session
    - Redirect to intended page or home

---

## Login Flow

### Endpoint

**POST** `/api/frontend/user/login`

### Request Headers

```
Vendor: {vendor_api_token}
Accept: application/json
Content-Type: application/json
```

### Request Body

```json
{
    "email": "john@example.com",
    "password": "SecurePass123"
}
```

### Validation Rules

- **email**: Required, valid email format
- **password**: Required

### Success Response (200)

```json
{
    "status": 200,
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "1|abc123xyz...",
        "user": {
            "id": 1,
            "party_id": 5,
            "email": "john@example.com",
            "email_verified_at": "2026-01-14T10:30:00.000000Z",
            "is_active": 1,
            "created_at": "2026-01-14T10:00:00.000000Z",
            "updated_at": "2026-01-14T10:30:00.000000Z",
            "party": {
                "party_id": 5,
                "full_name": "John Doe",
                "phone_number": "9812345678",
                "email": "john@example.com",
                "type": "customer"
            }
        }
    }
}
```

### Error Responses

#### Invalid Credentials (401)

```json
{
    "status": 401,
    "success": false,
    "message": "Invalid credentials",
    "data": null
}
```

#### Email Not Verified (403)

```json
{
    "status": 403,
    "success": false,
    "message": "Please verify your email before logging in",
    "data": null
}
```

#### Account Inactive (403)

```json
{
    "status": 403,
    "success": false,
    "message": "Your account is inactive. Please contact support.",
    "data": null
}
```

### Frontend Implementation Steps

1. **Create Login Form**
    - Email input field
    - Password input field (with visibility toggle)
    - "Remember me" checkbox (optional)
    - "Forgot password" link (if implemented)
    - Submit button
    - Link to registration page
    - Google OAuth button (if enabled)

2. **Form Validation (Client-Side)**
    - Validate email format
    - Ensure password is not empty
    - Display inline validation errors

3. **Submit Login**
    - Disable submit button during API call
    - Show loading indicator
    - Include Vendor header
    - Make POST request to login endpoint

4. **Handle Response**
    - **Success**:
        - Store token securely (localStorage or secure cookie)
        - Store user data in state management
        - Update authentication state
        - Redirect to intended page or dashboard
    - **Error**:
        - Display appropriate error message
        - For unverified email: Show "Resend Verification" option
        - Re-enable form

5. **Token Storage**
    - Store in localStorage for persistence: `localStorage.setItem('auth_token', token)`
    - OR use secure httpOnly cookies (recommended for production)
    - Store user data: `localStorage.setItem('user', JSON.stringify(user))`

6. **Post-Login Actions**
    - Initialize user session
    - Fetch user profile data
    - Sync cart/wishlist from server
    - Redirect to dashboard or previous page

---

## Google OAuth Flow

### Step 1: Initiate OAuth

**GET** `/api/frontend/user/vendor/{vendor_id}/google/redirect`

### URL Parameters

- **vendor_id**: Your vendor's database ID (not API token)

### Flow

1. User clicks "Sign in with Google" button
2. Frontend redirects user to this endpoint
3. Backend redirects to Google OAuth consent screen
4. User approves permissions on Google

### Step 2: OAuth Callback

**GET** `/api/frontend/user/vendor/{vendor_id}/google/callback`

This endpoint is handled automatically by Google after user consent.

### Success Response (302 Redirect)

User is redirected to frontend with token:

```
{vendor_google_redirect_uri}?token={auth_token}&customer_id={customer_id}
```

### Error Response (500)

```json
{
    "status": 500,
    "success": false,
    "message": "Error logging in with Google",
    "data": null
}
```

### Frontend Implementation Steps

1. **Add Google Sign-In Button**
    - Display "Sign in with Google" button on login/register pages
    - Use Google's official button styling (optional)

2. **Handle Button Click**
   ```javascript
   const handleGoogleSignIn = () => {
     const vendorId = process.env.VENDOR_ID; // From environment config
     window.location.href = `/api/frontend/user/vendor/${vendorId}/google/redirect`;
   };
   ```

3. **Create OAuth Callback Page**
    - Create a dedicated route/page for OAuth callback (e.g., `/auth/google/callback`)
    - This page should match the `google_redirect_uri` configured in vendor settings

4. **Handle Callback on Landing Page**
    - Parse URL parameters: `token` and `customer_id`
    - Store token securely
    - Fetch user profile (optional)
    - Update authentication state
    - Redirect to dashboard/home

5. **Error Handling**
    - Check for error parameters in URL
    - Display error message if OAuth fails
    - Provide fallback to regular login

### Example OAuth Callback Handler

```javascript
// On callback page load
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const customerId = urlParams.get('customer_id');
const error = urlParams.get('error');

if (error) {
    // Display error and redirect to login
    showError('Google authentication failed. Please try again.');
    setTimeout(() => redirectToLogin(), 3000);
} else if (token) {
    // Store token and redirect
    localStorage.setItem('auth_token', token);
    localStorage.setItem('customer_id', customerId);
    setAuthState(true);
    redirectToDashboard();
}
```

---

## Protected Routes

### Middleware

All protected routes require:

- `auth:sanctum` - Valid authentication token
- `vendor.verify` - Valid vendor API token

### Request Headers for Protected Routes

```
Vendor: {vendor_api_token}
Authorization: Bearer {user_token}
Accept: application/json
Content-Type: application/json
```

### Available Protected Endpoints

#### Change Password

**POST** `/api/frontend/user/change-password`

#### Logout

**POST** `/api/frontend/user/logout`

#### Cart Management

- **GET** `/api/frontend/user/cart`
- **POST** `/api/frontend/user/cart/store`
- **POST** `/api/frontend/user/cart/update/{cart}`
- **POST** `/api/frontend/user/cart/delete/{cart}`
- **POST** `/api/frontend/user/cart/clear`
- **POST** `/api/frontend/user/cart/order/store`
- **POST** `/api/frontend/user/cart/order/update/{order}`
- **POST** `/api/frontend/user/cart/check-discount`

#### Wishlist Management

- **GET** `/api/frontend/user/wishlist`
- **POST** `/api/frontend/user/wishlist/store`
- **POST** `/api/frontend/user/wishlist/delete/{wishlist}`
- **POST** `/api/frontend/user/wishlist/clear`

#### Profile Management

- **GET** `/api/frontend/user/profile`
- **POST** `/api/frontend/user/profile/update`
- **POST** `/api/frontend/user/profile/address/store`
- **POST** `/api/frontend/user/profile/address/delete/{id}`
- **GET** `/api/frontend/user/profile/orders`
- **GET** `/api/frontend/user/profile/order/{id}`

#### Messaging

- **POST** `/api/frontend/user/message/send`
- **POST** `/api/frontend/user/message/start/{productId}`

#### Reviews

- **POST** `/api/frontend/user/review/store/{productId}`

### Frontend Implementation

1. **Token Management**
    - Check for valid token before rendering protected routes
    - Redirect to login if token is missing or invalid
    - Refresh token if expired (implement token refresh if available)

2. **API Request Interceptor**
    - Automatically add Authorization header to all requests
    - Automatically add Vendor header to all requests
    - Handle 401 responses (token expired/invalid)
    - Redirect to login on authentication failure

3. **Route Protection**
    - Implement route guards/middleware
    - Check authentication state before rendering
    - Redirect unauthenticated users to login
    - Preserve intended destination for post-login redirect

---

## Error Handling

### Common Error Status Codes

| Status Code | Meaning          | Action                                        |
|-------------|------------------|-----------------------------------------------|
| 400         | Bad Request      | Display error message from response           |
| 401         | Unauthorized     | Clear token, redirect to login                |
| 403         | Forbidden        | Display error, may require email verification |
| 422         | Validation Error | Display field-specific errors                 |
| 500         | Server Error     | Display generic error, retry option           |

### Error Response Format

```json
{
    "status": 400,
    "success": false,
    "message": "Error message",
    "data": {
        "field_name": [
            "Error description"
        ]
    }
}
```

### Implementation Guidelines

1. **Display Errors Appropriately**
    - Validation errors: Show next to form fields
    - General errors: Show in toast/notification
    - Critical errors: Show modal/alert

2. **Error Messages**
    - Use error messages from API response
    - Provide user-friendly fallbacks
    - Avoid exposing technical details

3. **Retry Logic**
    - Implement retry for network failures
    - Don't retry on validation errors (4xx)
    - Limit retry attempts (max 3)

4. **Logging**
    - Log errors to console in development
    - Send critical errors to monitoring service in production
    - Include user context (but not sensitive data)

---

## State Management

### Authentication State

Maintain the following state across your application:

```javascript
{
    isAuthenticated: boolean,
        user
:
    {
        id: number,
            party_id
    :
        number,
            email
    :
        string,
            email_verified_at
    :
        string | null,
            is_active
    :
        boolean,
            party
    :
        {
            party_id: number,
                full_name
        :
            string,
                phone_number
        :
            string,
                email
        :
            string,
                type
        :
            string
        }
    }
,
    token: string | null,
        loading
:
    boolean,
        error
:
    string | null
}
```

### Actions to Implement

1. **Login**
    - Set isAuthenticated to true
    - Store user data
    - Store token

2. **Logout**
    - Set isAuthenticated to false
    - Clear user data
    - Clear token
    - Redirect to login

3. **Check Authentication**
    - On app initialization, check for stored token
    - Validate token with backend (optional)
    - Restore user state if valid

4. **Token Refresh**
    - Monitor token expiration (if JWT)
    - Refresh before expiration
    - Handle refresh failures (logout)

### Storage Recommendations

1. **Development**
    - localStorage for simplicity
    - Store both token and user data

2. **Production**
    - httpOnly cookies for token (most secure)
    - localStorage for user data
    - Implement CSRF protection

3. **Security Considerations**
    - Never store passwords
    - Clear sensitive data on logout
    - Implement token expiration
    - Use HTTPS only

---

## Complete Implementation Checklist

### Registration

- [ ] Create registration form with all required fields
- [ ] Implement client-side validation
- [ ] Handle form submission with loading state
- [ ] Display success/error messages
- [ ] Redirect to email verification pending page
- [ ] Create email verification pending page

### Email Verification

- [ ] Create verification callback/landing page
- [ ] Parse URL parameters (token, message)
- [ ] Store token on successful verification
- [ ] Update authentication state
- [ ] Handle verification errors
- [ ] Auto-redirect after verification

### Login

- [ ] Create login form
- [ ] Implement client-side validation
- [ ] Handle form submission
- [ ] Store token and user data
- [ ] Redirect to dashboard/intended page
- [ ] Handle email not verified error
- [ ] Add "Resend Verification" option

### Google OAuth

- [ ] Add Google Sign-In button
- [ ] Configure vendor ID
- [ ] Create OAuth callback page
- [ ] Handle callback parameters
- [ ] Store token on success
- [ ] Handle OAuth errors

### Protected Routes

- [ ] Implement route guards
- [ ] Add Authorization header to API requests
- [ ] Handle 401 responses
- [ ] Redirect to login on authentication failure
- [ ] Preserve intended destination

### State Management

- [ ] Set up authentication state
- [ ] Implement login action
- [ ] Implement logout action
- [ ] Implement token persistence
- [ ] Implement state restoration on app load

### Error Handling

- [ ] Display validation errors inline
- [ ] Show general errors in toast/notification
- [ ] Handle network failures
- [ ] Implement retry logic
- [ ] Log errors appropriately

---

## Security Best Practices

1. **Token Storage**
    - Use httpOnly cookies in production
    - Never expose tokens in URLs
    - Clear tokens on logout

2. **Password Handling**
    - Never store passwords in frontend
    - Use password visibility toggle
    - Enforce strong password requirements
    - Show password strength indicator

3. **HTTPS**
    - Always use HTTPS in production
    - Redirect HTTP to HTTPS
    - Enable HSTS headers

4. **Input Validation**
    - Validate all inputs client-side
    - Never trust client-side validation alone
    - Sanitize user inputs
    - Prevent XSS attacks

5. **Session Management**
    - Implement session timeout
    - Clear session on logout
    - Handle multiple tabs/windows
    - Implement "remember me" securely

---

## Support and Troubleshooting

### Common Issues

1. **"Unauthorized Vendor" Error**
    - Ensure Vendor header is included in all requests
    - Verify vendor API token is correct
    - Check token hasn't been regenerated

2. **"Invalid Credentials" on Login**
    - Verify email is correct
    - Check password is correct
    - Ensure account is verified
    - Check account is active

3. **Email Verification Not Working**
    - Check email configuration in backend
    - Verify email was sent (check spam folder)
    - Ensure verification link hasn't expired
    - Check token is valid

4. **Google OAuth Fails**
    - Verify vendor has OAuth configured
    - Check vendor ID is correct
    - Ensure redirect URI matches configuration
    - Verify Google credentials are valid

5. **Token Expired Errors**
    - Implement token refresh logic
    - Check token expiration time
    - Clear old tokens on logout
    - Handle expired tokens gracefully

---

## Additional Notes

1. **Email Configuration**
    - Email sending is handled by backend
    - Email templates are vendor-specific
    - SMTP configuration is per vendor

2. **Multi-Vendor Support**
    - Each vendor has unique API token
    - Vendor header is required for all requests
    - User accounts are vendor-specific

3. **Phone Number Handling**
    - Phone number is required during registration
    - Used for party/customer identification
    - Same phone with different email can exist (handled via party merging)

4. **Party System**
    - Customers are linked to parties in backend
    - Party can be customer, supplier, or both
    - Email verification updates party email if phone exists

---

## Conclusion

This guide provides comprehensive instructions for implementing customer authentication in your frontend application.
Follow the flows, handle errors appropriately, and implement security best practices for a robust authentication system.

For additional features or custom requirements, refer to the backend API documentation or contact the development team.

---

**Last Updated:** January 2026
**Version:** 1.0
