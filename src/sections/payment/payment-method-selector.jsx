"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";

import { FONEPAY_LOGO, FONEPAY_LOGO1 } from "./fonepay-qr-dialog";

// ── Design tokens — mirrors checkout ──
const RED = "#e61911";
const RED_DIM = "rgba(230,25,17,0.05)";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

export const PAYMENT_METHODS = {
  // cod: "cod",
  fonepay: "fonepay",
};

const PAYMENT_OPTIONS = [
  // {
  //   value: PAYMENT_METHODS.cod,
  //   label: "Cash on Delivery",
  //   description: "Pay when your order is delivered",
  //   icon: "solar:wallet-money-bold",
  // },
  {
    value: PAYMENT_METHODS.fonepay,
    label: "Checkout by Fonepay",
    description: "Scan & pay with your mobile banking app or wallet",
    image: FONEPAY_LOGO,
    image1: FONEPAY_LOGO1,
    vendorFlag: "has_fonepay_checkout",
  },
];

// ----------------------------------------------------------------------

/** Whether the vendor has Fonepay checkout enabled. */
export function useFonepayEnabled() {
  const { vendor } = useAppSelector((state) => state.vendor);

  return !!vendor?.has_fonepay_checkout;
}

export function PaymentMethodSelector({ value, onChange }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const availableOptions = PAYMENT_OPTIONS.filter(
    (option) => !option.vendorFlag || vendor?.[option.vendorFlag]
  );
  const availableKey = availableOptions.map((option) => option.value).join(",");

  // If the selected method is no longer offered (vendor config just loaded,
  // or disabled it), fall back to Cash on Delivery.
  useEffect(() => {
    if (value !== PAYMENT_METHODS.cod && !availableKey.split(",").includes(value)) {
      onChange(PAYMENT_METHODS.cod);
    }
  }, [value, availableKey, onChange]);

  return (
    <div role="radiogroup" aria-label="Payment method" className="flex flex-col gap-2">
      {availableOptions.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className="flex items-center gap-3 px-3 py-2.5 text-left transition"
            style={{
              border: `1px solid ${selected ? RED : BORDER}`,
              backgroundColor: selected ? RED_DIM : "#ffffff",
            }}
          >
            <span
              className="flex gap-2 flex-shrink-0 items-center justify-center "
            >
              {option.image1 ? (
                <img src={option.image1} alt={option.label} className="h-6 w-auto max-w-full object-contain" />
              ) : (
                <Iconify icon={option.icon} className="h-5 w-5" />
              )}
              {option.image ? (
                <img src={option.image} alt={option.label} className="h-6 w-auto max-w-full object-contain" />
              ) : (
                <Iconify icon={option.icon} className="h-5 w-5" />
              )}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold" style={{ color: TEXT }}>
                {option.label}
              </span>
              <span className="block truncate text-xs" style={{ color: TEXT_MUTED }}>
                {option.description}
              </span>
            </span>

            <span
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
              style={{ border: `2px solid ${selected ? RED : BORDER}` }}
            >
              {selected && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: RED }} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
