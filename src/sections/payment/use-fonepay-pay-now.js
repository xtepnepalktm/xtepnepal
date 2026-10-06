"use client";

import { useState, useCallback } from "react";

import { toast } from "@/components/snackbar";

import { initiateFonepay } from "@/api";
import { rememberFonepayAttempt } from "@/utils/fonepay";

// ----------------------------------------------------------------------
// "Pay now" for an existing order (order details, unpaid order list).
// Customer initiation always issues a new PRN, so a still-pending QR is
// reopened instead of creating a duplicate attempt.
// ----------------------------------------------------------------------

export function toFonepayDialogData(attempt) {
  if (!attempt) return null;

  return {
    prn: attempt.prn,
    amount: attempt.amount ?? attempt.payment_amount,
    qr_message: attempt.qr_message,
    thirdparty_qr_websocket_url: attempt.thirdparty_qr_websocket_url,
    banks: Array.isArray(attempt.banks) ? attempt.banks : [],
  };
}

export function useFonepayPayNow(orderId) {
  const [dialogData, setDialogData] = useState(null);
  const [isStarting, setIsStarting] = useState(false);

  const start = useCallback(
    async (fonepayPayment) => {
      if (isStarting) return;

      if (
        fonepayPayment?.payment_status === "pending" &&
        fonepayPayment?.prn &&
        fonepayPayment?.qr_message
      ) {
        setDialogData(toFonepayDialogData(fonepayPayment));
        return;
      }

      setIsStarting(true);

      try {
        const data = await initiateFonepay(orderId);

        if (!data?.qr_message || !data?.prn) {
          throw new Error("Couldn't get a Fonepay QR code.");
        }

        rememberFonepayAttempt({ orderId, prn: data.prn });
        setDialogData(toFonepayDialogData(data));
      } catch (err) {
        toast.error(err?.message || "Couldn't start Fonepay payment.");
      } finally {
        setIsStarting(false);
      }
    },
    [orderId, isStarting]
  );

  const close = useCallback(() => setDialogData(null), []);

  return { dialogData, isStarting, start, open: setDialogData, close };
}
