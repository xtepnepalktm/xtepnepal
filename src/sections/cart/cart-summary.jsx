import { z as zod } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setDiscount, removeDiscount } from "@/redux/actions";

import { fCurrency } from "@/utils/format-number";

import { Form, Field } from "@/components/hook-form";
import { toast } from "@/components/snackbar";
import { Iconify } from "@/components/iconify";

import { calculateCart } from "@/api";
import { PaymentMethodSelector } from "../payment";

// ----------------------------------------------------------------------

export const DiscountCodeSchema = zod.object({
  discount_code: zod.string().min(1, { message: "Discount code is required!" }),
});

export function CartSummary({
  isAddressSelected,
  selectedAddressId,
  onCheckout,
  disabled,
  paymentMethod,
  setPaymentMethod,
  onPaymentMethodChange,
  showPaymentMethod = false,
}) {
  const dispatch = useAppDispatch();

  const { total, subtotal, shipping, discount, items } = useAppSelector(
    (state) => state.cart
  );
  const { isLogin } = useAppSelector((state) => state.auth);

  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const defaultValues = { discount_code: "" };

  const methods = useForm({
    resolver: zodResolver(DiscountCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const runCalculation = async (discountCode) => {
    if (!isLogin) return;
    if (!items || items.length === 0) {
      setCalculation(null);
      return;
    }

    try {
      setIsCalculating(true);

      const safeDiscountCode =
        typeof discountCode === "string"
          ? discountCode.trim()
          : typeof discountCode === "object" && discountCode?.code
            ? String(discountCode.code).trim()
            : undefined;

      const payload = {
        ...(safeDiscountCode ? { discount_code: safeDiscountCode } : {}),
        ...(isAddressSelected &&
          selectedAddressId &&
          selectedAddressId !== "guest-address"
          ? { customer_address_id: selectedAddressId }
          : {}),
      };

      const response = await calculateCart(payload);
      if (response?.success && response?.data) {
        setCalculation(response.data);
      }
    } catch (error) {
      if (discountCode) {
        toast.error(
          (typeof error === "string" ? error : error?.message) ||
          "Couldn't apply discount code! Please try again."
        );
      }
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    runCalculation(discount?.code || undefined);
  }, [isLogin, isAddressSelected, selectedAddressId, subtotal, items?.length]);

  const handleRemoveDiscount = async () => {
    dispatch(removeDiscount());
    setCalculation(null);
    await runCalculation(undefined);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const discountCode = data.discount_code?.trim()?.toUpperCase();
      const payload = {
        discount_code: discountCode,
        ...(isAddressSelected &&
          selectedAddressId &&
          selectedAddressId !== "guest-address"
          ? { customer_address_id: selectedAddressId }
          : {}),
      };

      const response = await calculateCart(payload);

      if (!response?.success || !response?.data) {
        toast.error(
          response?.message || "Couldn't apply discount code! Please try again."
        );
        return;
      }

      setCalculation(response.data);
      dispatch(setDiscount(response.data));
      reset();
      toast.success("Discount applied!");
    } catch (error) {
      toast.error(
        (typeof error === "string" ? error : error?.message) ||
        "Couldn't apply discount code! Please try again."
      );
    }
  });

  const originaSubtotal = calculation?.original_total_amount;
  const taxableAmount = calculation?.tax?.taxable_amount ?? subtotal;
  const rawDiscount =
    calculation?.discount?.amount ??
    calculation?.discount_amount ??
    (typeof calculation?.discount === "number" ? calculation.discount : null) ??
    discount?.amount ??
    0;
  const discountAmount = Number(rawDiscount) || 0;
  const shippingAmount = calculation?.additional_charges_total ?? shipping;
  const totalAmount = calculation?.total_amount ?? total;

  const extractDiscountCode = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      return value.code || value.discount_code || "";
    }
    return "";
  };

  const appliedDiscountCode =
    extractDiscountCode(calculation?.discount_code) ||
    extractDiscountCode(discount?.code);

  return (
    <div className="lg:col-span-4 ">
      <div className="bg-white border border-red-200 shadow-sm p-6 sm:p-8">
        {/* Header */}
        <h2 className="text-lg font-extrabold uppercase tracking-tight text-gray-900 mb-6 pb-4 border-b border-gray-100">
          Order Summary
        </h2>

        {/* Line Items */}
        <div className="flex flex-col gap-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-semibold text-gray-900">{fCurrency(originaSubtotal)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-semibold text-red-600">-{fCurrency(discountAmount)}</span>
            </div>
          )}

          {calculation?.tax?.applied && (
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                {calculation.tax.tax_name} ({calculation.tax.percentage}%)
                {calculation.tax.price_includes_tax ? " · included" : ""}
              </span>
              <span className="shrink-0 font-semibold text-gray-900">
                {fCurrency(calculation.tax.tax_amount)}
              </span>
            </div>
          )}

          {isAddressSelected && (
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated shipping</span>
              <span className="font-semibold text-gray-900">
                {shippingAmount ? fCurrency(shippingAmount) : "Free"}
              </span>
            </div>
          )}

          {calculation?.flash_sale?.has_flash_sale_items &&
            calculation?.flash_sale?.total_flash_sale_savings > 0 && (
              <div className="flex items-center justify-between gap-2 bg-red-50 px-3 py-2">
                <span className="flex items-center gap-1.5 font-semibold text-red-700">
                  <Iconify icon="solar:fire-bold" width={16} />
                  Flash sale savings
                </span>
                <span className="font-bold text-red-700">
                  -{fCurrency(calculation.flash_sale.total_flash_sale_savings)}
                </span>
              </div>
            )}
        </div>

        {/* Total */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Estimated total
          </span>
          <span className="text-2xl sm:text-3xl font-black leading-none text-red-600">
            {fCurrency(totalAmount)}
          </span>
        </div>
        {/* Discount code + Checkout */}
        <div className="flex flex-col gap-4">
          {isLogin && (
            appliedDiscountCode ? (
              <div className="flex flex-col gap-2">
                {/* Applied badge */}
                <div className="flex items-center justify-between gap-3  border border-green-200 bg-green-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Iconify
                      icon="eva:checkmark-circle-2-fill"
                      width={18}
                      className="shrink-0 text-green-600"
                    />
                    <span className="font-semibold text-green-800">
                      {appliedDiscountCode}
                      {discountAmount > 0 && (
                        <span className="ml-1 font-normal text-green-700">
                          (–{fCurrency(discountAmount)})
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveDiscount}
                    className="shrink-0 text-xs font-semibold text-green-700 underline hover:text-green-900"
                  >
                    Remove
                  </button>
                </div>

                {/* Applies to product */}
                {calculation?.discount_code?.applies_to === "product" &&
                  calculation?.discount_info?.target && (
                    <p className="text-xs text-gray-500">
                      Applied on{" "}
                      <span className="font-semibold text-gray-800">
                        {calculation.discount_info.target.name}
                      </span>
                    </p>
                  )}

                {/* Applies to category */}
                {calculation?.discount_code?.applies_to === "category" && (
                  <p className="text-xs text-gray-500">Applied on category items</p>
                )}
              </div>
            ) : (
              <Form methods={methods} onSubmit={onSubmit}>
                <div className="flex gap-2">
                  <Field.Text
                    name="discount_code"
                    placeholder="Discount code"
                    onChange={(e) => {
                      setValue("discount_code", e.target.value.toUpperCase(), {
                        shouldValidate: true,
                      });
                    }}
                    className="flex-1"
                    inputClassName="h-11  border-gray-200 text-xs uppercase tracking-wide placeholder:normal-case placeholder:text-gray-400 focus:border-gray-900 focus:ring-gray-900"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || isCalculating}
                    className="shrink-0  bg-gray-900 px-5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting || isCalculating ? (
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Applying
                      </span>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              </Form>
            )
          )}

          {/* Checkout Button */}
          {onCheckout && (
            <button
              type="button"
              onClick={onCheckout}
              disabled={disabled}
              className="w-full  bg-red-600 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          )}

          <p className="text-center text-[11px] uppercase tracking-widest text-gray-400">
            Safe &amp; secure transactions via Fonepay
          </p>
        </div>
        {/* Payment Method */}
        {isLogin && (showPaymentMethod || paymentMethod !== undefined) && (
          <div className="border-t border-gray-100 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Payment Method
            </p>
            <PaymentMethodSelector
              value={paymentMethod}
              onChange={onPaymentMethodChange || setPaymentMethod}
            />
          </div>
        )}


      </div>


    </div>
  );
}
