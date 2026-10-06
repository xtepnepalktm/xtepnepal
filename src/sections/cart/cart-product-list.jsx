"use client";

import { CartProduct } from "./cart-product";

export function CartProductList({
  items,
  onDeleteCartItem,
  onChangeItemQuantity,
  onMoveToWishlist,
}) {
  return (
    <div className="w-full overflow-x-auto">
      {/* <table className="w-full text-left text-sm text-gray-500 whitespace-nowrap">
        <thead className="text-xs text-gray-700 bg-gray-50 border-b">
          <tr>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Quantity</th>
            <th scope="col" className="px-6 py-3 text-right">Total Price</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody> */}
      {items.map((row, index) => (
        <CartProduct
          key={index}
          row={row}
          onDeleteCartItem={onDeleteCartItem}
          onChangeItemQuantity={onChangeItemQuantity}
          onMoveToWishlist={onMoveToWishlist}
        />
      ))}
      {/* </tbody>
      </table> */}
    </div>
  );
}

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
  getLogisticCharge,
} from "@/api";

import { Field, Form } from "@/components/hook-form";

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

  const addressForm = useBoolean();
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const { addresses } = useAppSelector((state) => state.profile);
  const { discount, items: cartItems, total, subtotal, shipping } =
    useAppSelector((state) => state.cart);
  const { isLogin, user } = useAppSelector((state) => state.auth);

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
          ? discount.code
          : discount?.code?.code;

      const payload = isLogin
        ? {
          customer_address_id: selectedAddress,
          order_from: "web",
          ...(safeDiscount && { discount_code: safeDiscount }),
        }
        : {
          guest_address: guestAddress,
          order_from: "web",
          ...(safeDiscount && { discount_code: safeDiscount }),
        };

      const response = await createOrder(payload);

      const orderId =
        response?.data?.order_id || response?.data?.data?.order_id;

      if (!orderId) throw new Error("Order ID missing");

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
                  className="px-3 py-1.5 border  text-sm hover:bg-gray-50"
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
                    className="p-4 border  shadow-sm"
                    action={
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(address.address_id)}
                          className="text-sm text-red-600 border px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                        {selectedAddress !== address.address_id && (
                          <button
                            onClick={() => handleSelect(address)}
                            className="text-sm border px-3 py-1 rounded"
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
          />

          <button
            onClick={handleCheckout}
            disabled={!selectedAddress || isCheckoutLoading}
            className="w-full bg-black text-white py-3  disabled:opacity-50"
          >
            {isCheckoutLoading ? "Processing..." : "Checkout"}
          </button>
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