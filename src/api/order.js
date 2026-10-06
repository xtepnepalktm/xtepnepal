"use client";

import useSWR from "swr";
import { useSWRConfig } from "swr";

import { endpoints } from "./endpoints";

import { fetcher, poster as clientPoster } from "@/lib/axios-client";

import { poster as serverPoster } from "@/lib/axios-server";

export const useGetOrders = () => {
  const { data, error, isLoading } = useSWR(endpoints.order.list, fetcher);

  return {
    orders: data?.data?.orders || [],
    emailVerified: data?.data?.email_verified || false,
    hasHiddenOrders: data?.data?.has_hidden_orders || false,
    hiddenOrdersCount: data?.data?.hidden_orders_count || 0,
    visibleOrdersCount: data?.data?.visible_orders_count || 0,
    message: data?.data?.message,
    error,
    isLoading,
  };
};

export const useGetMutateOrders = () => {
  const { mutate } = useSWRConfig();

  return () => mutate(endpoints.order.list);
};

export const useGetOrderDetail = (id) => {
  const { data, error, isLoading } = useSWR(
    endpoints.order.details(id),
    fetcher
  );

  return {
    order: data?.data || {},
    error,
    isLoading,
  };
};

export const useGetMutateOrderDetail = (id) => {
  const { mutate } = useSWRConfig();

  return () => mutate(endpoints.order.details(id));
};

export const createOrder = async (cartData) => {
  try {
    const response = await clientPoster(endpoints.order.create, cartData);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createQuickOrder = async (data) => {
  try {
    const response = await serverPoster(endpoints.order.quickCreate, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderData) => {
  try {
    const orderId = orderData.order_id || orderData.id;
    const { id, order_id, ...dataToSend } = orderData;

    console.log("updateOrderStatus - orderId:", orderId);
    console.log("updateOrderStatus - dataToSend (without id):", dataToSend);
    console.log("updateOrderStatus - endpoint:", endpoints.order.update(orderId));

    const response = await clientPoster(
      endpoints.order.update(orderId),
      dataToSend
    );

    console.log("updateOrderStatus - response:", response);

    // Check if the response indicates success
    if (response && response.success === false) {
      throw new Error(response.message || "Failed to update order status");
    }

    return response;
  } catch (error) {
    console.error("updateOrderStatus - error:", error);
    throw error;
  }
};

export const updateOrderAddress = async (orderData) => {
  try {
    const orderId = orderData.order_id || orderData.id;
    const { id, order_id, ...dataToSend } = orderData;

    console.log("updateOrderAddress - orderId:", orderId);
    console.log("updateOrderAddress - dataToSend:", dataToSend);
    console.log("updateOrderAddress - endpoint:", endpoints.order.updateAddress(orderId));

    const response = await clientPoster(
      endpoints.order.updateAddress(orderId),
      dataToSend
    );

    return response;
  } catch (error) {
    throw error;
  }
};
