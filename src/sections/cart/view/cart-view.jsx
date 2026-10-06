"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileRequest } from "@/redux/actions";

import { CartOverview } from "../cart-overview";
import { CartSteps } from "../cart-steps";
import { CartBillingAddress } from "../cart-billing-address";

// ----------------------------------------------------------------------

const CHECKOUT_STEPS = ["Cart", "Billing & address"];

export function CartView() {
  const dispatch = useAppDispatch();

  const { activeStep } = useAppSelector((state) => state.cart);
  const { isLogin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileRequest());
    }
  }, [isLogin, dispatch]);

  return (
    <div className="container max-w-7xl mx-auto mt-0 mb-20 px-2">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-5xl uppercase my-0 md:mt-10 mb-0 font-bold">
        Your Performance Lab
      </h1>

      {/* <div className="flex justify-start">
        <div className="w-full md:w-2/3">
          <CartSteps steps={CHECKOUT_STEPS} activeStep={activeStep} />
        </div>
      </div> */}

      <>
        {activeStep === 0 && <CartOverview />}
        {activeStep === 1 && <CartBillingAddress />}
      </>
    </div>
  );
}