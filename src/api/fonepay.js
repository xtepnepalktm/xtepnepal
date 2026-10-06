"use client";

import { endpoints } from "./endpoints";

import { axiosInstance } from "@/lib/axios-client";

// ----------------------------------------------------------------------
// Customer Fonepay checkout. The backend owns amount, version and credentials,
// so every call sends an empty body. The axios instance is used directly
// (not `poster`) so QR payloads and PRNs are never logged to the console.

const post = async (url) => {
  const response = await axiosInstance.post(url, {});

  return response.data?.data ?? null;
};

export const initiateFonepay = (orderId) =>
  post(endpoints.fonepay.initiate(orderId));

export const checkFonepayStatusByPrn = (prn) =>
  post(endpoints.fonepay.statusByPrn(prn));

export const checkFonepayStatusByOrder = (orderId) =>
  post(endpoints.fonepay.statusByOrder(orderId));
