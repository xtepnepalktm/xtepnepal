
"use client";

import { useState } from "react";
import { useBoolean } from "minimal-shared/hooks";

import { fDateTime } from "@/utils/format-time";
import { Iconify } from "@/components/iconify";

import { OrderUpdateForm } from "./order-update-form";
import { OrderAddressUpdateForm } from "./order-address-update-form";

// ── Design tokens — mirrors CheckoutView ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ── Status badge config ──
const STATUS_CONFIG = {
  completed: { bg: "#f0fdf4", color: "#166534", label: "Completed" },
  delivered: { bg: "#f0fdf4", color: "#166534", label: "Delivered" },
  confirmed: { bg: "#eff6ff", color: "#1e40af", label: "Confirmed" },
  processing: { bg: "#eef2ff", color: "#3730a3", label: "Processing" },
  pending: { bg: "#fffbeb", color: "#92400e", label: "Pending" },
  cancelled: { bg: "rgba(230,25,17,0.07)", color: RED, label: "Cancelled" },
  returned: { bg: "#f5f5f5", color: TEXT_MUTED, label: "Returned" },
};

// ----------------------------------------------------------------------

export function OrderDetailsToolbar({ status, backHref, createdAt, orderNumber, orderId }) {
  const openOrderUpdateForm = useBoolean();
  const openOrderAddressUpdateForm = useBoolean();
  const [updateStatus, setUpdateStatus] = useState("");

  const isDone = ["delivered", "completed"].includes(status);
  const isLocked = ["cancelled", "returned"].includes(status);

  const handleAction = (newStatus) => {
    setUpdateStatus(newStatus);
    openOrderUpdateForm.onTrue();
  };

  const badge = STATUS_CONFIG[status] || { bg: BG, color: TEXT_MUTED, label: status };

  return (
    <>
      <div style={{
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        padding: "1.25rem 1.5rem",
        marginBottom: "2rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>

        {/* ── Left: back + info ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

          {/* Back button */}
          <a
            title="Back to orders"
            href={backHref}
            style={{
              width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: BG,
              border: `1px solid ${BORDER}`,
              color: TEXT_MUTED,
              textDecoration: "none",
              flexShrink: 0,
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = TEXT_MUTED}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = BORDER}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={18} />
          </a>

          {/* Order info */}
          <div>
            {/* Eyebrow */}
            <p style={{
              fontFamily: "Helvetica",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: RED,
              margin: "0 0 4px",
            }}>
              — Order
            </p>

            {/* Heading + badge */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.625rem", marginBottom: 4 }}>
              <h1 style={{
                fontFamily: "Helvetica",
                fontSize: 22, fontWeight: 800,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: TEXT,
                margin: 0,
                lineHeight: 1.1,
              }}>
                #{orderNumber}
              </h1>

              {/* Status badge */}
              <span style={{
                fontFamily: "Helvetica",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                backgroundColor: badge.bg,
                color: badge.color,
                padding: "3px 10px",
                border: `1px solid ${badge.color}22`,
              }}>
                {badge.label}
              </span>
            </div>

            {/* Created date */}
            <p style={{
              fontFamily: "Helvetica",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.05em",
              color: TEXT_MUTED,
              margin: 0,
            }}>
              {fDateTime(createdAt)}
            </p>
          </div>
        </div>

        {/* ── Right: actions ── */}
        {!isLocked && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", alignItems: "center" }}>

            {isDone ? (
              <ActionButton
                onClick={() => handleAction("returned")}
                variant="ghost"
              >
                Return Order
              </ActionButton>
            ) : (
              <>
                <ActionButton
                  onClick={() => handleAction("cancelled")}
                  variant="ghost"
                >
                  Cancel
                </ActionButton>

                <ActionButton
                  onClick={openOrderAddressUpdateForm.onTrue}
                  variant="primary"
                >
                  Change Address
                </ActionButton>
              </>
            )}
          </div>
        )}
      </div>

      {/* Red accent line — mirrors heading divider in CheckoutView */}
      <div style={{ height: 2, backgroundColor: RED, width: 48, marginTop: "-1.75rem", marginBottom: "2rem" }} />

      {orderId && (
        <OrderUpdateForm
          open={openOrderUpdateForm.value}
          onClose={openOrderUpdateForm.onFalse}
          orderUpdateData={{ id: orderId, status: updateStatus }}
        />
      )}

      {orderId && (
        <OrderAddressUpdateForm
          open={openOrderAddressUpdateForm.value}
          onClose={openOrderAddressUpdateForm.onFalse}
          orderUpdateData={{ id: orderId, status }}
        />
      )}
    </>
  );
}

// ── Button variants ──
function ActionButton({ onClick, variant = "ghost", children }) {
  const isPrimary = variant === "primary";

  const base = {
    fontFamily: "Helvetica",
    fontSize: 10, fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    padding: "0.5rem 1.25rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.15s",
  };

  const styles = isPrimary
    ? { ...base, backgroundColor: RED, color: WHITE }
    : { ...base, backgroundColor: BG, color: TEXT_MUTED, border: `1px solid ${BORDER}` };

  return (
    <button
      type="button"
      onClick={onClick}
      style={styles}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary ? "#c41510" : BORDER;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary ? RED : BG;
      }}
    >
      {children}
    </button>
  );
}