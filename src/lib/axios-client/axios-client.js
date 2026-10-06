import axios from "axios";

import { CONFIG } from "@/global-config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add Vendor header
    config.headers["Vendor"] = CONFIG.vendorToken;

    // Add Authorization header if token exists
    if (typeof window !== "undefined") {
      // Get token from localStorage (redux-persist key is "persist:<CONFIG.persistKey>")
      const persistedAuth = localStorage.getItem(`persist:${CONFIG.persistKey}`);
      if (persistedAuth) {
        try {
          const persistedState = JSON.parse(persistedAuth);
          const authState = persistedState?.auth
            ? JSON.parse(persistedState.auth)
            : null;
          const token = authState?.userToken;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing persisted auth state:", error);
        }
      }
    }

    console.log("[AXIOS] Request:", {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasVendorHeader: !!config.headers["Vendor"],
      hasAuthHeader: !!config.headers["Authorization"],
    });
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[AXIOS] Response:", {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error("[AXIOS] Full Error Object:", error);
    console.error("[AXIOS] Error Details:", {
      hasResponse: !!error.response,
      hasRequest: !!error.request,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message,
    });

    if (error.response) {
      console.error("[AXIOS] Server responded with error");
    } else if (error.request) {
      console.error("[AXIOS] No response received from server");
    } else {
      console.error("[AXIOS] Error setting up request");
    }

    return Promise.reject(
      (error.response && error.response.data) ||
      error.message ||
      "Something went wrong!"
    );
  }
);

// ----------------------------------------------------------------------

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);

    throw error;
  }
};

// ----------------------------------------------------------------------

export const poster = async (args, data) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  console.log("[POSTER] Called with:", {
    url,
    hasData: !!data,
    dataKeys: data ? Object.keys(data) : [],
  });

  try {
    const response = data
      ? await axiosInstance.post(url, data, { ...config })
      : await axiosInstance.post(url, { ...config });

    console.log("[POSTER] Success:", {
      status: response.status,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error("[POSTER] Error:", error);
    throw error;
  }
};
