"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCartDataRequest,
  getWishlistRequest,
  getVendorDetailRequest,
  getProfileRequest,
  clearWishlist,
} from "@/redux/actions";

import { axiosInstance } from "@/lib/axios-client";

export function AuthLayout({ children }) {
  const dispatch = useAppDispatch();

  const { userToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Always fetch vendor details (doesn't require auth)
    dispatch(getVendorDetailRequest());
  }, []); // Only run once on mount

  useEffect(() => {
    if (userToken) {
      // Set Authorization header (axios interceptor will also handle this from localStorage)
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${userToken}`;

      // Fetch user-specific data only when authenticated
      dispatch(getProfileRequest());
      dispatch(getCartDataRequest());
      dispatch(getWishlistRequest());
    } else {
      // Clear user data when not authenticated
      dispatch(clearWishlist());

      // Remove Authorization header
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }, [userToken, dispatch]);

  return children;
}
