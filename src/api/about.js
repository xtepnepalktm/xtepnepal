"use client";

import useSWR from "swr";

import { endpoints } from "./endpoints";

import { fetcher } from "@/lib/axios-server";

export const useGetAboutData = () => {
    const { data, error, isLoading } = useSWR(endpoints.about, fetcher);

    return {
        aboutData: data?.data || {},
        error,
        isLoading,
    };
};

export const useGetStoreLocation = () => {
    const { data, error, isLoading } = useSWR(endpoints.storeLocation, fetcher);

    return {
        storeLocationData: data?.data || data || '',
        error,
        isLoading,
    };
};

export const useGetOurStory = () => {
    const { data, error, isLoading } = useSWR(endpoints.ourStory, fetcher);

    return {
        ourStoryData: data?.data || {},
        error,
        isLoading,
    };
};
