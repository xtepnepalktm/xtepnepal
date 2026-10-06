"use client";

import { useState, useEffect } from "react";
import { useBoolean } from "minimal-shared/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeActiveStep,
  setProfileAddresses,
  resetCart,
  setShippingCharge,
} from "@/redux/actions";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { toast } from "@/components/snackbar";
import { EmptyContent } from "@/components/empty-content";
import { CartSummary } from "./cart-summary";
import { AddressItem, AddressNewForm } from "../address";

import {
  useGetStates,
  removeAddress,
  createOrder,
  initiateFonepay,
  getLogisticCharge,
} from "@/api";

import { Field, Form } from "@/components/hook-form";
import { rememberFonepayAttempt } from "@/utils/fonepay";
import {
  PAYMENT_METHODS,
  FonepayQrDialog,
  PaymentMethodSelector,
  toFonepayDialogData,
  useFonepayEnabled,
} from "../payment";
import { Iconify } from "@/components/iconify";

/* ---------------- Schema ---------------- */

export const SignUpSchema = zod
  .object({
    name: zod.string().min(1),
    phone_number: zod.string().regex(/^\d{10}$/),
    email: zod.string().email(),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match!",
    path: ["password_confirmation"],
  });

/* ---------------- Component ---------------- */

export function CartBillingAddress() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [guestAddress, setGuestAddress] = useState(null);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const fonepayEnabled = useFonepayEnabled();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.cod);
  const [fonepayCheckout, setFonepayCheckout] = useState(null); // { orderId, prn, amount, qr_message, ... }

  const addressForm = useBoolean();
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const { addresses } = useAppSelector((state) => state.profile);
  const { discount, items: cartItems, total, subtotal, shipping } =
    useAppSelector((state) => state.cart);
  const { isLogin, user } = useAppSelector((state) => state.auth);

  // Fonepay initiation needs a customer token, so guests check out with COD
  const payWithFonepay =
    isLogin && fonepayEnabled && paymentMethod === PAYMENT_METHODS.fonepay;

  const { states } = useGetStates();

  /* ---------------- Auto select ---------------- */

  useEffect(() => {
    if (isLogin) {
      if (addresses?.length && !selectedAddress) {
        handleSelect(addresses[0]);
      } else if (!addresses?.length) {
        addressForm.onTrue();
      }
    }
  }, [addresses, isLogin]);

  /* ---------------- Helpers ---------------- */

  const handleBack = () => {
    dispatch(changeActiveStep(0));
  };

  const handleSelect = async (address) => {
    try {
      setSelectedAddress(address.address_id);

      const logisticCharge = await getLogisticCharge(
        address.district.district_id
      );

      dispatch(setShippingCharge(logisticCharge.charge_amount));
    } catch {
      toast.error("Couldn't select address!");
    }
  };

  const handleGuestSelect = async (address) => {
    try {
      setSelectedAddress("guest-address");
      setGuestAddress(address);

      localStorage.setItem("guestAddress", JSON.stringify(address));

      const logisticCharge = await getLogisticCharge(
        address.district.district_id
      );

      dispatch(setShippingCharge(logisticCharge.charge_amount));
    } catch {
      toast.error("Couldn't select address!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeAddress(id);

      const updated = addresses.filter((a) => a.address_id !== id);
      dispatch(setProfileAddresses(updated));

      toast.success("Address deleted!");
    } catch {
      toast.error("Delete failed!");
    }
  };

  /* ---------------- Checkout ---------------- */

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);

    try {
      const safeDiscount =
        typeof discount?.code === "string"
          ? discount.code.trim()
          : typeof discount?.code === "object" && discount?.code
            ? (discount.code.code || discount.code.discount_code || "").trim()
            : typeof discount === "string"
              ? discount.trim()
              : undefined;

      const payload = isLogin
        ? {
          customer_address_id: selectedAddress,
          order_from: "web",
          ...(safeDiscount ? { discount_code: safeDiscount } : {}),
        }
        : {
          guest_address: guestAddress,
          order_from: "web",
          ...(safeDiscount ? { discount_code: safeDiscount } : {}),
        };

      const response = await createOrder(payload);

      const orderId =
        response?.data?.order_id || response?.data?.data?.order_id;

      if (!orderId) throw new Error("Order ID missing");

      // The cart order endpoint only saves the order — it never initiates
      // Fonepay, so a separate authenticated call requests the QR.
      if (payWithFonepay) {
        // Don't resetCart() yet: it sets activeStep back to 0, which unmounts
        // this component (and the QR dialog with it). Reset once the dialog
        // is done instead.
        localStorage.removeItem("guestAddress");

        try {
          const data = await initiateFonepay(orderId);

          if (!data?.qr_message || !data?.prn) {
            throw new Error("Couldn't get a Fonepay QR code.");
          }

          rememberFonepayAttempt({ orderId, prn: data.prn });

          // Stay on this page — the QR dialog tracks the payment
          setFonepayCheckout({ orderId, ...toFonepayDialogData(data) });
        } catch (fonepayError) {
          dispatch(resetCart());
          toast.error(
            fonepayError?.message ||
            "Order saved, but the Fonepay QR couldn't be generated. You can retry payment from your order page."
          );

          router.push(paths.order.details(orderId));
        }

        return;
      }

      dispatch(resetCart());
      localStorage.removeItem("guestAddress");

      toast.success("Order created!");

      router.push(paths.order.details(orderId));
    } catch (err) {
      toast.error(err?.message || "Checkout failed!");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  /* ---------------- Fonepay dialog ---------------- */

  // Closing the dialog doesn't cancel the attempt — the order is already
  // saved and payment can be retried from the order details page.
  const finishFonepayCheckout = () => {
    const orderId = fonepayCheckout?.orderId;
    setFonepayCheckout(null);
    dispatch(resetCart());
    if (orderId) router.push(paths.order.details(orderId));
  };

  const handleFonepaySuccess = () => {
    toast.success("Payment successful!");
    finishFonepayCheckout();
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="md:col-span-8">
          <div className="flex flex-col gap-4">

            {/* Header */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="text-sm text-gray-700 hover:text-black"
              >
                ← Back
              </button>

              {isLogin && (
                <button
                  onClick={addressForm.onTrue}
                  className="px-3 py-1.5 border text-sm hover:bg-gray-50"
                >
                  + New address
                </button>
              )}
            </div>

            {/* LOGIN ADDRESS */}
            {isLogin ? (
              addresses?.length ? (
                addresses.map((address) => (
                  <AddressItem
                    key={address.address_id}
                    addressItem={address}
                    selectedAddress={selectedAddress}
                    className="p-4 border shadow-sm"
                    action={
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(address.address_id)}
                          className="text-sm text-red-600 border px-3 py-1"
                        >
                          Delete
                        </button>

                        {selectedAddress !== address.address_id && (
                          <button
                            onClick={() => handleSelect(address)}
                            className="text-sm border px-3 py-1"
                          >
                            Select
                          </button>
                        )}
                      </div>
                    }
                  />
                ))
              ) : (
                <EmptyContent
                  title="No Address Found"
                  description="Add address to continue"
                />
              )
            ) : (
              /* GUEST */
              <div className="p-4 border ">
                <h2 className="text-lg font-semibold mb-4">
                  Order Details
                </h2>

                <Form>
                  <div className="flex flex-col gap-4">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field.Text name="name" label="Name" />
                      <Field.Text name="phone_number" label="Phone" />
                      <Field.Text name="email" label="Email" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field.Text
                        name="password"
                        label="Password"
                        type={showPassword.value ? "text" : "password"}
                      />

                      <Field.Text
                        name="password_confirmation"
                        label="Confirm"
                        type={
                          showConfirmPassword.value ? "text" : "password"
                        }
                      />
                    </div>
                  </div>
                </Form>

                <AddressNewForm
                  open
                  isInline
                  states={states}
                  isLogin={false}
                  initialData={guestAddress}
                  onAddressAddSuccess={handleGuestSelect}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:col-span-4 space-y-4">
          <CartSummary
            isAddressSelected={selectedAddress !== ""}
            selectedAddressId={selectedAddress}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            showPaymentMethod={isLogin}
          />

          <button
            onClick={handleCheckout}
            disabled={!selectedAddress || isCheckoutLoading || Boolean(fonepayCheckout)}
            className="w-full bg-black text-white py-3  disabled:opacity-50 font-black"
          >
            {isCheckoutLoading
              ? payWithFonepay ? "Generating QR..." : "Processing..."
              : payWithFonepay
                ? "Pay with Fonepay"
                : "Checkout"}
          </button>

          {/* Local Advantage Chip */}
          <div className="mt-4 flex items-center gap-4 border border-gray-100 bg-gray-50 p-4">
            <Iconify icon="solar:delivery-bold" width={24} className="shrink-0 text-red-600" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
                Fast Nepal delivery
              </p>
              <p className="text-[12px] text-gray-500">
                Arrives in 2–4 business days within Kathmandu Valley.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {isLogin && (
        <AddressNewForm
          open={addressForm.value}
          onClose={addressForm.onFalse}
          states={states}
          isLogin={true}
          onAddressAddSuccess={handleSelect}
        />
      )}

      {/* FONEPAY QR */}
      <FonepayQrDialog
        open={Boolean(fonepayCheckout)}
        orderId={fonepayCheckout?.orderId}
        initialData={fonepayCheckout}
        onClose={finishFonepayCheckout}
        onSuccess={handleFonepaySuccess}
      />

      {/* LOADING */}
      {isCheckoutLoading && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white mt-3">Creating your order...</p>
        </div>
      )}
    </>
  );
}