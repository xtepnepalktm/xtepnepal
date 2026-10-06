// ----------------------------------------------------------------------
// Persist the in-flight attempt so a reload/re-login/lost response can
// resume status checks without requesting a duplicate QR (customer
// initiation always issues a new PRN — there is no server-side reuse).
// ----------------------------------------------------------------------

const PENDING_ORDER_KEY = "fonepay_pending_order_id";
const PENDING_PRN_KEY = "fonepay_pending_prn";

export function rememberFonepayAttempt({ orderId, prn }) {
  try {
    if (orderId) localStorage.setItem(PENDING_ORDER_KEY, String(orderId));
    if (prn) localStorage.setItem(PENDING_PRN_KEY, String(prn));
  } catch {
    // localStorage unavailable — attempt just won't be recoverable locally
  }
}

export function getRememberedFonepayAttempt() {
  try {
    return {
      orderId: localStorage.getItem(PENDING_ORDER_KEY) || "",
      prn: localStorage.getItem(PENDING_PRN_KEY) || "",
    };
  } catch {
    return { orderId: "", prn: "" };
  }
}

export function forgetFonepayAttempt() {
  try {
    localStorage.removeItem(PENDING_ORDER_KEY);
    localStorage.removeItem(PENDING_PRN_KEY);
  } catch {
    // ignore
  }
}

// ----------------------------------------------------------------------
// Customer status response is a flat object (payment_status,
// lifecycle_status, accounting_finalized, reconciliation_error). Map it
// to a UI state key per the documented table.
// ----------------------------------------------------------------------

export function resolveFonepayUiState(status) {
  if (!status) return { key: "unknown" };

  const { payment_status, lifecycle_status, accounting_finalized, reconciliation_error } =
    status;

  if (lifecycle_status === "abandoned" && payment_status === "pending") {
    return { key: "abandoned" };
  }

  if (payment_status === "paid" && accounting_finalized) {
    return { key: "success" };
  }

  if (payment_status === "paid") {
    return { key: "paid_pending_finalize" };
  }

  if (payment_status === "failed") {
    return { key: "failed" };
  }

  if (payment_status === "pending" && reconciliation_error) {
    return { key: "errors_pending" };
  }

  if (payment_status === "pending") {
    return { key: "pending" };
  }

  return { key: "unknown" };
}

// ----------------------------------------------------------------------
// v2 bank-app shortcut: only for a valid intentScheme, QR payload encoded.
// ----------------------------------------------------------------------

export function bankPaymentUrl(bank, qrPayload) {
  if (!bank?.intentScheme || !qrPayload) return null;

  return `${bank.intentScheme}?qrPayload=${encodeURIComponent(qrPayload)}`;
}

// ----------------------------------------------------------------------
// Order payment state. Online payment can only start before a sale is
// linked (the backend rejects initiation otherwise), and never for a
// cancelled order or one whose gateway payment already went through.
// ----------------------------------------------------------------------

export function hasPaidGatewayAttempt(order) {
  return (
    order?.fonepay_payment?.payment_status === "paid" ||
    order?.esewa_payment?.payment_status === "paid"
  );
}

export function canPayOrderOnline(order) {
  if (!order?.order_id) return false;

  const isCancelled = /cancel|reject/i.test(String(order.status || ""));

  return !order.sale && !isCancelled && !hasPaidGatewayAttempt(order);
}
