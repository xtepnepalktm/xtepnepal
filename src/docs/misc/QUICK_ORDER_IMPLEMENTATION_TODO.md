# Quick Order Implementation - TODO

## 📋 Understanding

### Two Checkout Scenarios:
1. **Regular Cart Checkout**: User proceeds to checkout from cart with all cart items
2. **Buy Now Checkout**: User clicks "Buy Now" on a product card → redirected to checkout with ONLY that product

### Key Requirements:
- Quick Order form used for BOTH scenarios
- Buy Now does NOT modify the existing cart
- Buy Now checkout shows ONLY the clicked product
- Cart checkout shows ALL cart items

---

## 🎯 Implementation Plan

### 1. Checkout Page Route
- [x] Route exists: `/checkout`
- [ ] Create checkout page component at `src/app/checkout/page.jsx`
- [ ] Detect URL parameters to determine scenario:
  - `?buyNow=true&productId={id}&quantity={qty}` → Buy Now mode
  - No params → Regular cart checkout mode

### 2. Buy Now Mode (Single Product Checkout)
- [ ] Read query parameters: `buyNow`, `productId`, `quantity`
- [ ] Fetch product details by `productId`
- [ ] Display product card above the checkout form showing:
  - Product image
  - Product name
  - Product price (flash sale if applicable)
  - Quantity selector (editable)
  - Subtotal calculation
- [ ] Pre-fill order_items array with single product:
  ```javascript
  order_items: [{
    item_type: "Product",
    item_id: productId,
    quantity: quantity,
    price: productPrice
  }]
  ```

### 3. Regular Cart Checkout Mode
- [ ] Fetch cart items from Redux/API
- [ ] Display all cart items above the checkout form
- [ ] Show cart summary (subtotal, items count)
- [ ] Build order_items array from all cart items:
  ```javascript
  order_items: cartItems.map(item => ({
    item_type: item.variant_id ? "ProductVariant" : "Product",
    item_id: item.variant_id || item.product_id,
    quantity: item.quantity,
    price: item.price
  }))
  ```

### 4. Quick Order Form (Shared Component)
- [ ] Customer Information Section:
  - Full Name (required)
  - Email (required)
  - Phone (required)
  - Password (optional - for new customers only)
  - Helper text: "Password is required only for first-time customers"

- [ ] Delivery Address Section:
  - State dropdown (required)
  - District dropdown (required) - populated after state selection
  - Detailed Address textarea (required)
  - Auto-fetch logistic charge when district is selected

- [ ] Order Summary Section:
  - Subtotal (calculated)
  - Shipping/Logistic Charge (from API)
  - Discount Code input (optional)
  - Total Amount (bold, highlighted)
  - Remarks/Special Instructions (optional)

### 5. Two-Flow Backend Integration

#### Scenario A: New Customer (Email Not Registered)
- [ ] Submit form to `POST /api/frontend/quick-order/store`
- [ ] Backend response includes:
  ```javascript
  {
    order: {...},
    customer: {...},
    token: "1|abc123..."
  }
  ```
- [ ] Store token in localStorage
- [ ] Auto-login user
- [ ] Redirect to order details page
- [ ] If Buy Now mode: Cart remains unchanged
- [ ] If Cart mode: Clear cart after successful order

#### Scenario B: Existing Customer (Email Already Registered)
- [ ] Submit form to `POST /api/frontend/quick-order/store`
- [ ] Backend response includes:
  ```javascript
  {
    requires_otp: true,
    email: "user@example.com",
    expires_in_minutes: 5,
    order_preview: {...}
  }
  ```
- [ ] Show OTP verification dialog:
  - 6-digit OTP input fields
  - Auto-focus and navigation
  - Paste support
  - Countdown timer (5 minutes)
  - Resend OTP option
- [ ] Submit OTP to `POST /api/frontend/quick-order/verify-and-create`
- [ ] After successful verification:
  - Store token
  - Auto-login
  - Redirect to order details
  - Handle cart accordingly (clear if cart mode, keep if buy now mode)

### 6. UI/UX Elements

#### Product Display (Above Form)
- [ ] **Buy Now Mode**: 
  - Single product card with image
  - Quantity input with +/- buttons
  - Real-time price calculation
  - Prominent "Checkout this item" heading
  
- [ ] **Cart Mode**:
  - List of all cart items
  - Each item shows: image, name, quantity, price, subtotal
  - Cart summary (total items, subtotal)
  - "Checkout your cart" heading

#### Form Validation
- [ ] Use React Hook Form with Zod validation
- [ ] Required fields marked with asterisk
- [ ] Real-time validation feedback
- [ ] Error messages below each field
- [ ] Disable submit button while processing

#### OTP Dialog
- [ ] Modal/Dialog component
- [ ] Email address display
- [ ] 6 input fields (1 digit each)
- [ ] Auto-focus first field
- [ ] Auto-advance to next field on input
- [ ] Backspace to previous field
- [ ] Paste support (distribute 6 digits)
- [ ] Countdown timer display
- [ ] Verify button
- [ ] Cancel button
- [ ] Error message display area

#### Success/Error Handling
- [ ] Toast notifications for feedback
- [ ] Loading states on buttons
- [ ] Error alert boxes for form errors
- [ ] Success redirect with confirmation message
- [ ] Discount code validation feedback

### 7. State Management
- [ ] Detect checkout mode on mount (buyNow vs cart)
- [ ] Fetch product details if buyNow mode
- [ ] Fetch cart items if cart mode
- [ ] Manage form state (React Hook Form)
- [ ] Manage OTP state (values, dialog open/close)
- [ ] Manage loading states (submit, verify, fetch)
- [ ] Manage error states (form errors, API errors)
- [ ] Calculate dynamic totals (subtotal + shipping - discount)

### 8. API Integration
- [ ] Import quick-order functions from `@/api`:
  - `submitQuickOrder(orderData)`
  - `verifyOtpAndCreateOrder(verifyData)`
- [ ] Import state/district functions:
  - `useGetStates()` hook
  - `getLogisticCharge(districtId)`
- [ ] Import product fetch (for buyNow mode):
  - Fetch product by ID from URL params
- [ ] Handle API response types (new customer vs existing customer)
- [ ] Handle API errors (validation, expired OTP, etc.)

### 9. Redux Integration
- [ ] After successful order:
  - `dispatch(setUser(data))` - login user
  - `dispatch(getCartDataRequest())` - refresh cart
  - If cart checkout: Cart will be empty after order
  - If buy now: Cart remains unchanged

### 10. Edge Cases & Error Handling
- [ ] Invalid productId in URL → Show error, redirect to home
- [ ] Product out of stock → Show error message
- [ ] Empty cart on cart checkout → Redirect to cart page
- [ ] Network errors → Show retry option
- [ ] OTP expired → Allow resend
- [ ] Invalid discount code → Show specific error message
- [ ] Minimum order amount not met → Show required amount
- [ ] Rate limiting (too many OTP requests) → Show wait time

---

## 📁 Files to Create/Modify

### New Files:
1. `src/app/checkout/page.jsx` - Main checkout page
2. `src/sections/checkout/checkout-view.jsx` - Checkout view component
3. `src/sections/checkout/quick-order-form.jsx` - Quick order form component (reusable)
4. `src/sections/checkout/otp-verification-dialog.jsx` - OTP dialog component
5. `src/sections/checkout/buy-now-product-display.jsx` - Single product display for buy now
6. `src/sections/checkout/cart-items-display.jsx` - Cart items display

### Modified Files:
1. `src/routes/paths.js` - Already has `/checkout` route ✓
2. `src/sections/product/product-item.jsx` - Already redirects to checkout ✓
3. `src/api/quick-order.js` - Should already exist with API functions
4. `src/api/endpoints.js` - Should already have quick-order endpoints

---

## 🔄 User Flow Summary

### Buy Now Flow:
```
Product Card → Click "Buy Now" 
  ↓
/checkout?buyNow=true&productId=123&quantity=1
  ↓
[Display Selected Product + Quantity Selector]
[Quick Order Form]
  ↓
Submit Order
  ↓
New User? → Order Created → Auto-login → Redirect
Existing User? → OTP Dialog → Verify → Order Created → Auto-login → Redirect
  ↓
Cart remains unchanged ✓
```

### Cart Checkout Flow:
```
Cart Page → Click "Checkout" / "Proceed to Checkout"
  ↓
/checkout
  ↓
[Display All Cart Items]
[Quick Order Form]
  ↓
Submit Order
  ↓
New User? → Order Created → Auto-login → Redirect
Existing User? → OTP Dialog → Verify → Order Created → Auto-login → Redirect
  ↓
Cart is cleared ✓
```

---

## ✅ Success Criteria
- [ ] Buy Now works from product cards
- [ ] Buy Now checkout shows only selected product
- [ ] Buy Now does not modify cart
- [ ] Regular cart checkout works with all items
- [ ] New customer flow works (with password)
- [ ] Existing customer flow works (with OTP)
- [ ] OTP verification works correctly
- [ ] Auto-login after successful order
- [ ] Proper error handling for all scenarios
- [ ] Responsive design (mobile & desktop)
- [ ] Loading states on all async actions
- [ ] Toast notifications for user feedback
- [ ] Discount code validation
- [ ] Logistic charge auto-calculation

---

**Status**: ⏳ Awaiting Review & Confirmation

Please review and let me know if anything is missing or needs adjustment before implementation!
