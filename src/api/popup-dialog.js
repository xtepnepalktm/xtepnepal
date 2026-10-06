"use client";

import useSWR from "swr";

import { endpoints } from "./endpoints";

import { fetcher } from "@/lib/axios-server";

export const useGetPopupDialogData = () => {
    const { data, error, isLoading } = useSWR(endpoints.popupDialog, fetcher);

    return {
        popupDialogData: data?.data || [],
        error,
        isLoading,
    };
};
