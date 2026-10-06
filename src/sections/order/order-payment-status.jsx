"use client";

import { fCurrency } from "@/utils/format-number";
import { canPayOrderOnline, hasPaidGatewayAttempt } from "@/utils/fonepay";

import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import {
  FONEPAY_LOGO,
  FONEPAY_LOGO1,
  FONEPAY_RED,
  FonepayQrDialog,
  toFonepayDialogData,
  useFonepayEnabled,
  useFonepayPayNow,
} from "../payment";

// ── Design tokens ──
const WHITE = "#ffffff";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

const TONES = {
  success: { bg: "#f0fdf4", color: "#166534" },
  warning: { bg: "#fffbeb", color: "#92400e" },
  pending: { bg: "rgba(230,25,17,0.07)", color: RED },
  error: { bg: "rgba(230,25,17,0.07)", color: RED },
  neutral: { bg: "#f5f5f5", color: TEXT_MUTED },
};

const PAYMENT_METHOD_META = {
  cash: { label: "Cash on Delivery", icon: "solar:wallet-money-bold" },
  cod: { label: "Cash on Delivery", icon: "solar:wallet-money-bold" },
  bank: { label: "Bank Transfer", icon: "solar:card-bold" },
  fonepay: { label: "Checkout by Fonepay", image: FONEPAY_LOGO },
};

function getPaymentMethodMeta(method) {
  const key = String(method || "").toLowerCase();

  return (
    PAYMENT_METHOD_META[key] || {
      label: method ? String(method) : "Not selected",
      icon: "solar:card-bold",
    }
  );
}

// Map a nullable gateway attempt to a short label + tone. Null is not a failure.
function getAttemptDisplay(attempt) {
  if (!attempt) return null;

  const { payment_status, lifecycle_status, reconciliation_error } = attempt;

  if (lifecycle_status === "manual_review") return { label: "Payment needs review", tone: "warning" };
  if (lifecycle_status === "abandoned") return { label: "Automatic checking stopped", tone: "neutral" };
  if (payment_status === "paid" && reconciliation_error) {
    return { label: "Payment received; processing", tone: "warning" };
  }
  if (payment_status === "paid") return { label: "Payment received", tone: "success" };
  if (payment_status === "failed") return { label: "Not paid", tone: "error" };
  if (payment_status === "pending") return { label: "Awaiting payment", tone: "pending" };

  return { label: "Payment status unknown", tone: "neutral" };
}

function Badge({ tone, children }) {
  const { bg, color } = TONES[tone] || TONES.neutral;

  return (
    <span
      style={{
        fontFamily: "Helvetica",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        backgroundColor: bg, color,
        border: `1px solid ${color}22`,
        padding: "3px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------
// Renders whatever payment actually happened on the order from the sale's
// own paid/due ledger (the accounting source of truth). Before a sale is
// linked, offers Fonepay "Pay now"; gateway attempts are shown for reference.
// ----------------------------------------------------------------------

export function OrderPaymentStatus({ order, onRefresh }) {
  const { order_id: orderId, total_amount: orderTotal, sale, fonepay_payment: fonepayPayment } =
    order || {};

  const fonepayEnabled = useFonepayEnabled();
  const payNow = useFonepayPayNow(orderId);

  const hasPaidAttempt = hasPaidGatewayAttempt(order);
  const canPayOnline = canPayOrderOnline(order);
  const showPayFonepay = canPayOnline && fonepayEnabled;

  const handlePaySuccess = () => {
    payNow.close();
    toast.success("Payment successful!");
    onRefresh?.();
  };

  const handleDialogClose = () => {
    payNow.close();
    onRefresh?.();
  };

  const cardStyle = { backgroundColor: WHITE, border: `1px solid ${BORDER}`, padding: "1.25rem", marginTop: "1.5rem" };

  const heading = (badge) => (
    <div className="mb-3 flex items-center justify-between gap-2">
      <p style={{
        fontFamily: "Helvetica", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: RED, borderLeft: `3px solid ${RED}`, paddingLeft: "0.75rem", margin: 0,
      }}>
        Payment
      </p>
      {badge}
    </div>
  );

  const dialog = (
    <FonepayQrDialog
      open={Boolean(payNow.dialogData)}
      orderId={orderId}
      initialData={payNow.dialogData}
      onClose={handleDialogClose}
      onSuccess={handlePaySuccess}
    />
  );

  if (!order?.order_id) return null;

  // ── No sale yet: online payment is still possible ──
  if (!sale) {
    return (
      <div style={cardStyle}>
        {heading(
          hasPaidAttempt ? (
            <Badge tone="success">Payment received</Badge>
          ) : (
            canPayOnline && <Badge tone="pending">Unpaid</Badge>
          )
        )}

        {showPayFonepay ? (
          <>
            <p className="mb-4 text-sm" style={{ color: TEXT_MUTED }}>
              Pay{" "}
              {orderTotal ? (
                <span className="font-semibold" style={{ color: TEXT }}>{fCurrency(orderTotal)}</span>
              ) : (
                "for this order"
              )}{" "}
              online now.
            </p>

            <button
              type="button"
              onClick={() => payNow.start(fonepayPayment)}
              disabled={payNow.isStarting}
              className="flex w-full items-center justify-center gap-2 bg-white px-3 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-red-50 disabled:opacity-60"
              style={{ border: `1px solid ${BORDER}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = FONEPAY_RED; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
            >
              <img src={FONEPAY_LOGO} alt="" className="h-5 w-auto" />
              {payNow.isStarting ? "Generating QR..." : "Pay with Fonepay"}
            </button>
          </>
        ) : (
          <p className="text-sm" style={{ color: TEXT_MUTED }}>
            {hasPaidAttempt
              ? "Your payment was received. It will reflect here once your order is confirmed."
              : "Payment will be processed once your order is confirmed."}
          </p>
        )}

        {dialog}
      </div>
    );
  }

  // ── Sale linked: the ledger is the source of truth ──
  const methodMeta = getPaymentMethodMeta(sale.payment_method);

  const totalAmount = Number(sale.total_amount || 0);
  const paidAmount = Number(sale.paid_amount || 0);
  const dueAmount = Number(sale.due_amount ?? totalAmount - paidAmount);

  const overallTone = dueAmount <= 0 ? "success" : paidAmount > 0 ? "warning" : "pending";
  const overallLabel = dueAmount <= 0 ? "Paid" : paidAmount > 0 ? "Partially paid" : "Payment pending";

  const attemptDisplay = getAttemptDisplay(fonepayPayment);

  // Only offer Fonepay interaction while the vendor has it enabled —
  // otherwise a retry would initiate against missing credentials.
  const canOpenFonepay =
    fonepayEnabled &&
    sale.payment_method === "fonepay" &&
    fonepayPayment &&
    fonepayPayment.payment_status !== "paid";

  return (
    <div style={cardStyle}>
      {heading(<Badge tone={overallTone}>{overallLabel}</Badge>)}

      {/* Method */}
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-14 flex-shrink-0 items-center justify-center bg-white"
          style={{ border: `1px solid ${BORDER}`, color: TEXT_MUTED }}
        >
          {methodMeta.image ? (
            <div>

              <img src={methodMeta.image} alt={methodMeta.label} className="h-6 w-auto max-w-full object-contain" />
              <img src='/assets/images/payment-vendors/fconnect.png' alt={methodMeta.label} className="h-6 w-auto max-w-full object-contain" />
            </div>
          ) : (
            <Iconify icon={methodMeta.icon} className="h-5 w-5" />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold" style={{ color: TEXT }}>{methodMeta.label}</p>
          {sale.invoice_number && (
            <p className="truncate text-xs" style={{ color: TEXT_MUTED }}>Invoice {sale.invoice_number}</p>
          )}
        </div>
      </div>

      {/* Amounts */}
      <dl className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt style={{ color: TEXT_MUTED }}>Total</dt>
          <dd className="font-semibold" style={{ color: TEXT }}>{fCurrency(totalAmount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt style={{ color: TEXT_MUTED }}>Paid</dt>
          <dd className="font-semibold" style={{ color: TEXT }}>{fCurrency(paidAmount)}</dd>
        </div>
        {dueAmount > 0 && (
          <div className="flex justify-between">
            <dt style={{ color: TEXT_MUTED }}>Due</dt>
            <dd className="font-semibold" style={{ color: RED }}>{fCurrency(dueAmount)}</dd>
          </div>
        )}
      </dl>

      {/* Fonepay attempt detail */}
      {attemptDisplay && (
        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: TEXT_MUTED }}>
              Fonepay attempt
            </p>
            <Badge tone={attemptDisplay.tone}>{attemptDisplay.label}</Badge>
          </div>

          {canOpenFonepay && (
            <button
              type="button"
              // A sale is linked, so no new initiation — reopen the saved attempt to check it
              onClick={() => payNow.open(toFonepayDialogData(fonepayPayment))}
              className="mt-2 w-full px-3 py-2 text-xs font-semibold text-white transition hover:brightness-90 disabled:opacity-60"
              style={{ backgroundColor: FONEPAY_RED }}
            >
              {fonepayPayment.payment_status === "failed" ? "Retry with Fonepay" : "View QR / Check status"}
            </button>
          )}
        </div>
      )}

      {dialog}
    </div>
  );
}
