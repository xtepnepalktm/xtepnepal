
"use client";

import { z as zod } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "minimal-shared/hooks";

import { useAppSelector } from "@/redux/hooks";
import { Form, Field, schemaHelper } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { useGetStates, updateOrderStatus, getLogisticCharge } from "@/api";
import { AddressNewForm } from "../address";
import { useGetMutateOrders, useGetMutateOrderDetail } from "@/api/order";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

export const schema = zod.object({
  customer_address_id: schemaHelper.nullableInput(
    zod.string().min(1, { message: "Address is required!" }),
    { message: "Address is required!" }
  ),
});

// ----------------------------------------------------------------------

export function OrderAddressUpdateForm({ open, onClose, orderUpdateData }) {
  const openAddressForm = useBoolean();
  const mutateOrders = useGetMutateOrders();
  const mutateOrderDetail = useGetMutateOrderDetail(orderUpdateData?.id);
  const { states } = useGetStates();
  const { addresses } = useAppSelector((state) => state.profile);
  const [selectedCharge, setSelectedCharge] = useState(0);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { customer_address_id: "" },
  });

  const { handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = methods;
  const selectedAddressId = watch("customer_address_id");

  useEffect(() => {
    if (!selectedAddressId) { setSelectedCharge(0); return; }
    const address = addresses?.find((a) => String(a.address_id) === String(selectedAddressId));
    if (!address?.district?.district_id) return;
    (async () => {
      try {
        const res = await getLogisticCharge(address.district.district_id);
        setSelectedCharge(res.charge_amount);
      } catch { setSelectedCharge(0); }
    })();
  }, [selectedAddressId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateOrderStatus({
        id: orderUpdateData.id,
        logistic_charge: selectedCharge,
        customer_address_id: data.customer_address_id,
      });
      toast.success("Address updated successfully");
      reset(); onClose(); mutateOrders(); mutateOrderDetail();
    } catch (error) {
      toast.error(error?.message || "Update failed");
    }
  });

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0,0,0,0.45)",
      }}>
        {/* Modal */}
        <div style={{ width: "100%", maxWidth: 440, backgroundColor: WHITE, border: `1px solid ${BORDER}` }}>

          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1rem 1.25rem",
            borderBottom: `1px solid ${BORDER}`,
          }}>
            <p style={{
              fontFamily: "Helvetica",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: RED,
              borderLeft: `3px solid ${RED}`,
              paddingLeft: "0.75rem",
              margin: 0,
            }}>
              Change Delivery Address
            </p>

            <button
              type="button"
              onClick={openAddressForm.onTrue}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "Helvetica",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: TEXT_MUTED,
                backgroundColor: BG,
                border: `1px solid ${BORDER}`,
                padding: "0.375rem 0.75rem",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = TEXT_MUTED}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = BORDER}
            >
              <Iconify icon="mingcute:add-line" width={14} />
              Add new
            </button>
          </div>

          {/* Body */}
          <form onSubmit={onSubmit} style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Select */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{
                fontFamily: "Helvetica",
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: TEXT_MUTED,
              }}>
                Select Address
              </span>
              <select
                value={selectedAddressId || ""}
                onChange={(e) => setValue("customer_address_id", e.target.value)}
                style={{
                  width: "100%",
                  fontFamily: "Helvetica",
                  fontSize: 12, fontWeight: 600,
                  color: TEXT,
                  backgroundColor: BG,
                  border: `1px solid ${BORDER}`,
                  padding: "0.625rem 0.75rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Choose address</option>
                {addresses?.map((address) => (
                  <option key={address.address_id} value={String(address.address_id)}>
                    {address.address}, {address.district?.district_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery charge info */}
            {selectedCharge > 0 && (
              <div style={{
                backgroundColor: "rgba(230,25,17,0.07)",
                borderLeft: `3px solid ${RED}`,
                padding: "0.75rem 1rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontFamily: "Helvetica", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TEXT_MUTED }}>
                  Delivery charge:
                </span>
                <span style={{ fontFamily: "Helvetica", fontSize: 14, fontWeight: 800, color: RED }}>
                  Rs. {selectedCharge}
                </span>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.625rem", paddingTop: "0.25rem" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  fontFamily: "Helvetica",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: TEXT_MUTED,
                  backgroundColor: BG,
                  border: `1px solid ${BORDER}`,
                  padding: "0.5rem 1.25rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = TEXT_MUTED}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = BORDER}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontFamily: "Helvetica",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: WHITE,
                  backgroundColor: isSubmitting ? TEXT_MUTED : RED,
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#c41510"; }}
                onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = RED; }}
              >
                {isSubmitting ? "Updating…" : "Update Address"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <AddressNewForm
        open={openAddressForm.value}
        onClose={openAddressForm.onFalse}
        states={states}
        onAddressAddSuccess={(addr) => {
          openAddressForm.onFalse();
          setValue("customer_address_id", String(addr.address_id));
        }}
      />
    </>
  );
}