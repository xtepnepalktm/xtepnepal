# Fonepay v1/v2 frontend integration

This document is for web, mobile, and POS clients. Fonepay v1 and v2 use the **same application routes and checkout UI contract**. The backend selects the version from the vendor configuration and stores it on the payment attempt. Clients must never send a gateway version, merchant credentials, signatures, terminal IDs, or a client-calculated amount.

Related references: [customer routes](fonepay-frontend-routes.md), [staff routes](fonepay-api-routes.md), and [shared API behavior](README.md).

## Authentication

| Client | Authentication |
| --- | --- |
| Customer checkout | Customer bearer token and the required `Vendor` header |
| Staff sales/POS checkout | Staff bearer token (`auth:api`); permissions and vendor ownership are checked by the API |

Treat the backend as the only payment authority. A QR scan, bank-app callback, websocket message, or HTTP `200` does **not** prove payment. Only a status response with `payment_status: "paid"` and `accounting_finalized: true` is complete.

## Routes

### Customer order checkout

| Method | Route | Use |
| --- | --- | --- |
| POST | `/api/frontend/user/fonepay/initiate/{orderId}` | Create a QR attempt for the full order total |
| POST | `/api/frontend/user/fonepay/status/{prn}` | Verify one saved payment attempt |
| POST | `/api/frontend/user/fonepay/status/order/{orderId}` | Verify the newest attempt for an order |
| GET | `/api/frontend/user/profile/order/{orderId}` | Reload order/payment state after checkout |

Initiation body is empty:

```json
{}
```

### Staff order, sale, and POS checkout

| Method | Route | Use |
| --- | --- | --- |
| POST | `/api/fonepay/initiate/order/{orderId}` | Create/reuse an order checkout attempt |
| POST | `/api/fonepay/initiate/sale/{saleId}` | Create/reuse a direct-sale or POS checkout attempt |
| GET | `/api/fonepay/status/order/{orderId}` | Verify latest order attempt |
| GET | `/api/fonepay/status/sale/{saleId}` | Verify latest sale/POS attempt |
| GET | `/api/fonepay/status/prn/{prn}` | Verify a specific displayed attempt |

The normal staff business endpoints (`/api/order/store`, `/api/sale/store`, `/api/pos/store`, and added-payment endpoints) also return `fonepay_payment` when `payment_method: "fonepay"` is used. Continue using their existing payment amount and wallet fields. Do not add v1/v2 fields.

## Initiation response and QR display

Customer initiation returns this shape:

```json
{
  "status": 200,
  "success": true,
  "data": {
    "prn": "ORD42ABC12345",
    "amount": 1000,
    "qr_message": "gateway QR payload",
    "client_code": "optional-v1-value",
    "device_id": "optional-v1-value",
    "merchant_code": "merchant-or-terminal-value",
    "thirdparty_qr_websocket_url": "wss://optional-gateway-socket",
    "status": "pending",
    "lifecycle_status": "active",
    "qr_response": {},
    "banks": []
  }
}
```

Staff initiation and normal staff business responses place the same checkout information at `data.fonepay_payment`:

```json
{
  "fonepay_payment": {
    "id": 89,
    "prn": "SAL312NKJIHPBL",
    "payment_amount": 27000,
    "qr_message": "gateway QR payload",
    "thirdparty_qr_websocket_url": "wss://optional-gateway-socket",
    "payment_status": "pending",
    "lifecycle_status": "active"
  }
}
```

Render `qr_message` as QR **text** using the app QR component. It is not guaranteed to be an image URL or PNG. Show the server amount next to it. Save the `prn`, amount, order/sale ID, and QR data in the checkout screen state so a refresh can resume status checking.

Do not show a ready-to-pay QR when `qr_message` is empty. Show a retry/status-recovery UI instead.

## v1 versus v2 and bank shortcuts

The frontend does not choose a version. `banks` is optional metadata returned by the customer initiation endpoint when the backend is using v2, a party/customer phone is available, and the bank-list request succeeds.

```json
{
  "banks": [
    {
      "bankName": "Example Bank",
      "bankCode": "EXAMPLE",
      "bankIcon": "https://...",
      "intentScheme": "examplebank://pay"
    }
  ]
}
```

Use this rule:

- A non-empty `banks` array means this checkout has v2 bank-app shortcut metadata; render bank buttons in addition to the QR.
- Missing or empty `banks` does **not** prove v1. It can also mean a missing phone number, a party-less POS sale, or a temporary bank-list failure. Always render the QR checkout normally.
- Do not display a “v1”/“v2” label or branch payment verification logic by version.

For each bank button, only use a valid `intentScheme`. Build the app link with the QR payload URL-encoded:

```js
function bankPaymentUrl(bank, qrPayload) {
  if (!bank?.intentScheme || !qrPayload) return null;
  return `${bank.intentScheme}?qrPayload=${encodeURIComponent(qrPayload)}`;
}
```

Use `bankName` and `bankIcon` for presentation. If the icon fails, use a text fallback such as the first two characters of `bankCode`. Opening a bank app does not change local payment state; immediately continue status polling when the user returns.

## Websocket behavior

`thirdparty_qr_websocket_url` is optional for both versions. If it is present, the client may connect and use any received event only as a hint to perform an immediate API status check.

The gateway websocket event schema is not a stable frontend contract. Therefore:

1. Never mark an order or sale paid from a websocket event.
2. Never trust an amount, PRN, or status contained only in a websocket event.
3. On any event, debounce and call the matching API status route.
4. Keep polling even if the websocket cannot connect or disconnects.

## Polling and completion

Use one in-flight request at a time. Poll while the checkout view is visible (for example, every 3–5 seconds), and stop when the view unmounts or the payment reaches a terminal finalized state.

```js
async function verifyCustomerPayment(prn) {
  const response = await api.post(`/api/frontend/user/fonepay/status/${encodeURIComponent(prn)}`);
  const payment = response.data.data;

  if (payment.payment_status === 'paid' && payment.accounting_finalized) {
    stopPolling();
    await reloadOrder(payment.order_id);
    showSuccess();
  } else if (payment.payment_status === 'failed') {
    stopPolling();
    showFailure();
  } else {
    showWaiting(payment.reconciliation_error || null);
  }
}
```

For staff, call the appropriate `/api/fonepay/status/order`, `/sale`, or `/prn` route and read the object at `response.data.data`.

| Server state | Frontend behavior |
| --- | --- |
| `pending`, no `reconciliation_error` | Keep the QR visible and poll |
| `pending`, reconciliation error present | Say verification is temporarily unavailable; retain PRN and offer retry |
| `paid`, `accounting_finalized: false` | Say payment received and processing; never request another charge |
| `paid`, `accounting_finalized: true` | Stop polling and reload order/sale data |
| `failed` | Show failure; status-check before creating another checkout |
| `lifecycle_status: abandoned` and pending | Automatic polling stopped server-side; offer manual status check |

## Errors, retries, and safety

- Disable the pay button while initiation is in flight.
- A timeout or initiation error does not prove that no attempt was created. Recover by order/sale status before generating another QR.
- Never retry by changing the amount on the client. The server owns the amount and reconciliation validation.
- Do not log or store gateway raw responses, websocket event data, bank deep links, or QR payloads in analytics if they can be treated as payment identifiers.
- Do not expose vendor Fonepay/eSewa credentials in frontend configuration or vendor-details responses; frontend only needs the boolean availability flags and checkout responses.

## Acceptance checklist

- QR is rendered from non-empty `qr_message` and displays the server amount.
- `banks` enhances a v2 checkout but the QR still works when it is absent.
- Websocket events trigger verification only; they never finalize UI payment state directly.
- Refresh restores the PRN and resumes status checking.
- UI completion requires `payment_status === "paid"` and `accounting_finalized === true`.
- Frontend sends no version, private key, token, signature, merchant code, or terminal ID.
