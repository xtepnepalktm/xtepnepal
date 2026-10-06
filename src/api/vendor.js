import { endpoints } from "./endpoints";

import { fetcher as serverFetcher } from "@/lib/axios-server";

import { CONFIG } from "@/global-config";

export async function getVendorDetails() {
  try {
    const response = await serverFetcher(endpoints.vendor);

    return response.data[0];
  } catch (error) {
    console.error(error);

    throw error;
  }
}

// Helper function to get dynamic app name from vendor API
export async function getAppName() {
  try {
    const vendorDetails = await getVendorDetails();
    const appName = vendorDetails?.vendor_name || CONFIG.appName;
    return { appName };
  } catch (error) {
    console.error(error);
    return { appName: CONFIG.appName };
  }
}
