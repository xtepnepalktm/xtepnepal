"use client";

import { useEffect, useMemo, useState } from "react";

import { Iconify } from "@/components/iconify";
import { fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------
// Lets a shopper pick variant options (size, color, etc.) from a product
// card before adding to cart / buying now, without leaving the listing.

export function ProductVariantDialog({ open, onClose, product, intent = "cart", onConfirm }) {
  const {
    name,
    featured_image,
    variants = [],
    price,
    selling_price,
    flash_sale_products,
  } = product || {};

  const regularPrice = selling_price?.regularPrice || price;
  const flashSalePrice = selling_price?.flashSalePrice || price;
  const hasFlashSale = flash_sale_products?.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    if (!open || !variants?.length) return;
    const defaultVariant = variants[0];
    setSelectedVariant(defaultVariant);
    const initial = {};
    defaultVariant.variant_values?.forEach((val) => {
      const typeName = val.variant_type?.name;
      if (typeName) initial[typeName] = val.value;
    });
    setSelectedOptions(initial);
  }, [open, variants]);

  const optionGroups = useMemo(() => {
    if (!variants?.length) return [];

    const optionTypeNames = [];
    variants.forEach((v) => {
      v.variant_values?.forEach((val) => {
        const typeName = val.variant_type?.name;
        if (typeName && !optionTypeNames.includes(typeName)) optionTypeNames.push(typeName);
      });
    });

    return optionTypeNames.map((typeName) => {
      const compatibleVariants = variants.filter((v) =>
        v.variant_values?.every((val) => {
          const otherType = val.variant_type?.name;
          if (!otherType || otherType === typeName) return true;
          return (
            selectedOptions[otherType] === undefined || selectedOptions[otherType] === val.value
          );
        })
      );

      const values = [];
      compatibleVariants.forEach((v) => {
        v.variant_values?.forEach((val) => {
          if (val.variant_type?.name !== typeName) return;
          if (!values.includes(val.value)) values.push(val.value);
        });
      });

      if (/size/i.test(typeName)) {
        values.sort((a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b));
      }

      return { name: typeName, values };
    });
  }, [variants, selectedOptions]);

  const handleOptionSelect = (optionName, optionValue) => {
    const nextOptions = { ...selectedOptions, [optionName]: optionValue };

    let bestVariant = null;
    let maxScore = -1;

    variants.forEach((v) => {
      const hasClickedValue = v.variant_values?.some(
        (val) => val.variant_type?.name === optionName && val.value === optionValue
      );
      if (!hasClickedValue) return;

      let score = 0;
      v.variant_values?.forEach((val) => {
        const typeName = val.variant_type?.name;
        if (typeName !== optionName && nextOptions[typeName] === val.value) score++;
      });

      if (score > maxScore) {
        maxScore = score;
        bestVariant = v;
      }
    });

    if (bestVariant) {
      setSelectedVariant(bestVariant);
      const updatedOptions = {};
      bestVariant.variant_values?.forEach((val) => {
        const typeName = val.variant_type?.name;
        if (typeName) updatedOptions[typeName] = val.value;
      });
      setSelectedOptions(updatedOptions);
    }
  };

  const variantRegular = selectedVariant?.price || regularPrice;
  const showSale = hasFlashSale && parseFloat(flashSalePrice) < parseFloat(variantRegular);
  const displayPrice = showSale ? flashSalePrice : variantRegular;

  const isConfirmDisabled = variants?.length > 0 && !selectedVariant;

  const handleConfirm = () => onConfirm?.(selectedVariant?.variant_id);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative mx-4 flex w-full max-w-xs flex-col overflow-hidden bg-white shadow-[0_24px_48px_rgba(0,0,0,0.16)]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-gray-50">
            <img
              src={featured_image}
              alt={name}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold uppercase tracking-wide text-gray-900">
              {name}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-gray-900">{fCurrency(displayPrice)}</span>
              {showSale && (
                <span className="text-xs text-gray-400 line-through">
                  {fCurrency(variantRegular)}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-gray-400 transition-colors hover:text-black"
          >
            <Iconify icon="mingcute:close-line" width={18} />
          </button>
        </div>

        {/* Variant options */}
        <div className="flex flex-col gap-4 p-4">
          {optionGroups.map((group) => (
            <div key={group.name} className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
                {group.name}
                {selectedOptions[group.name] && (
                  <span className="ml-1 normal-case tracking-normal font-semibold text-gray-900">
                    — {selectedOptions[group.name]}
                  </span>
                )}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.values.map((value) => {
                  const isSelected = selectedOptions[group.name] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleOptionSelect(group.name, value)}
                      className={[
                        "h-9 min-w-[44px] border px-3 text-xs font-semibold uppercase tracking-wide transition-all duration-150",
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-800 hover:border-black",
                      ].join(" ")}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Confirm */}
        <div className="p-4 pt-0">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={[
              "flex w-full items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-150",
              isConfirmDisabled
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-black text-white hover:bg-gray-800 active:scale-[0.99]",
            ].join(" ")}
          >
            <Iconify icon={intent === "buy" ? "solar:bolt-bold" : "solar:cart-plus-bold"} width={16} />
            {intent === "buy" ? "Buy Now" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
