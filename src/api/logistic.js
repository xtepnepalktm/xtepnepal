import { endpoints } from "./endpoints";

import { fetcher } from "@/lib/axios-server";

export const getLogisticCharge = async (id) => {
  try {
    const response = await fetcher(endpoints.logistic.getCharge(id));

    return response.data[0];
  } catch (error) {
    throw error;
  }
};
