"use client";

import { useEffect, useMemo, useState } from "react";

import { Iconify } from "@/components/iconify";
import { fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------
// Renders on the back face of a flipped product card, letting a shopper
// pick variant options (size, color, etc.) without leaving the listing.

export function ProductVariantFlipPanel({ open, onBack, product, onConfirm }) {
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

  const isOutOfStock = variants?.length > 0
    ? (selectedVariant
      ? Boolean(selectedVariant.is_out_of_stock) || (typeof selectedVariant?.stock?.stock_balance === "number" && selectedVariant.stock.stock_balance <= 0)
      : Boolean(product?.is_out_of_stock))
    : Boolean(product?.is_out_of_stock) || (typeof product?.stock?.stock_balance === "number" && product.stock.stock_balance <= 0);

  const isConfirmDisabled = (variants?.length > 0 && !selectedVariant) || isOutOfStock;

  const handleAddToCart = (e) => {
    e?.preventDefault();
    if (isOutOfStock) return;
    onConfirm?.(selectedVariant?.variant_id, "cart");
  };

  const handleBuyNow = (e) => {
    e?.preventDefault();
    if (isOutOfStock) return;
    onConfirm?.(selectedVariant?.variant_id, "buy");
  };

  const handleBack = (e) => {
    e?.preventDefault();
    onBack?.();
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white border border-gray-200 shadow-lg">
      {/* Image */}
      <div className="relative h-40 shrink-0 overflow-hidden bg-gray-100 sm:h-40">
        <img
          src={featured_image}
          alt={name}
          title={name}
          className="h-full w-full object-contain mix-blend-multiply"
        />
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
        >
          <Iconify icon="mingcute:left-line" width={16} />
        </button>
      </div>

      {/* Name + price */}
      <div className="border-b border-gray-100 px-3 py-2">
        <p className="truncate lg:text-lg font-bold uppercase tracking-wider text-gray-900">
          {name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-[#e40013]">{fCurrency(displayPrice)}</span>
          {showSale && (
            <span className="text-[11px] text-gray-400 line-through">
              {fCurrency(variantRegular)}
            </span>
          )}
        </div>
      </div>

      {/* Variant options */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-2.5">
        {optionGroups.map((group) => (
          <div key={group.name} className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-gray-400">
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
                      "h-8 min-w-[40px] border px-2.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-150",
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
      <div className="flex shrink-0 flex-col gap-1.5 p-2.5 pt-0">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isConfirmDisabled}
          className={[
            "flex w-full items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-150",
            isConfirmDisabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-black text-white hover:bg-gray-800 active:scale-[0.99]",
          ].join(" ")}
        >
          {!isOutOfStock && <Iconify icon="solar:cart-plus-bold" width={15} />}
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
        {!isOutOfStock && (
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isConfirmDisabled}
            className={[
              "flex w-full items-center justify-center gap-2 border py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-150",
              isConfirmDisabled
                ? "cursor-not-allowed border-gray-100 text-gray-400"
                : "border-black text-black hover:bg-black hover:text-white active:scale-[0.99]",
            ].join(" ")}
          >
            <Iconify icon="solar:bolt-bold" width={15} />
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
}
