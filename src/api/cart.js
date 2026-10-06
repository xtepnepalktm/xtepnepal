import { endpoints } from "./endpoints";

import { fetcher, poster } from "@/lib/axios-client";

export const getCartData = async () => {
  try {
    const response = await fetcher(endpoints.cart.getProducts);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const addProductToCart = async (product, token) => {
//   try {
//     if (token) {
//       const response = await poster(
//         [
//           endpoints.cart.addProduct,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         ],
//         product
//       );

//       return response.data;
//     } else {
//       const response = await poster(endpoints.cart.addProduct, product);

//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// };
export const addProductToCart = async (product, token = null) => {
  // Log what we're sending to debug the validation issue
  console.log("[CART API] Adding to cart with data:", product);

  // Ensure product is an array and add product_type if missing
  let productArray = Array.isArray(product) ? product : [product];

  // The cart is polymorphic: a variant is identified by
  // { product_type: "ProductVariant", product_id: <variant_id> }, not by a
  // separate `variant_id` field alongside product_type "Product" (the API
  // silently ignores `variant_id` and rejects the item as variant-less).
  productArray = productArray.map((item) =>
    item.variant_id
      ? {
          product_type: "ProductVariant",
          product_id: item.variant_id,
          quantity: item.quantity || 1,
        }
      : {
          product_type: item.product_type || "Product",
          product_id: item.product_id,
          quantity: item.quantity || 1,
        }
  );

  // If only one item, send as single object; otherwise send as array
  // Some APIs expect single item for add-to-cart
  const payload = productArray.length === 1 ? productArray[0] : productArray;

  console.log("[CART API] Formatted payload:", payload);

  // If token is provided, pass it in the Authorization header
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const res = await poster(
    token ? [endpoints.cart.addProduct, config] : endpoints.cart.addProduct,
    payload,
  );

  console.log("[CART API] Response:", res);

  // Return the data in a consistent format
  // API might return { success: true, data: [...] } or just the data
  return res?.data || res;
};

export const updateProductInCart = async ({ cartId, quantity }) => {
  try {
    const response = await poster(endpoints.cart.updateProduct(cartId), {
      quantity,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const removeProductFromCart = async (cartId) => {
  try {
    const response = await poster(endpoints.cart.removeProduct(cartId));
    return response;
  } catch (error) {
    throw error;
  }
};

export const clearCartData = async () => {
  try {
    const response = await poster(endpoints.cart.clearProducts);

    return response;
  } catch (error) {
    throw error;
  }
};

export const checkDiscount = async (data) => {
  try {
    const response = await poster(endpoints.cart.checkDiscount, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const calculateCart = async (data = {}) => {
  try {
    const response = await poster(endpoints.cart.calculate, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const syncCartToServer = async (items, token = null) => {
  console.log("[CART SYNC] Syncing items:", items);

  // Sync each item individually so one invalid item doesn't block the
  // rest of the guest cart from being carried over on login.
  // addProductToCart() takes care of mapping variant_id to the
  // { product_type: "ProductVariant", product_id: <variant_id> } shape
  // the API expects.
  const succeeded = [];
  const failed = [];

  for (const item of items) {
    try {
      const res = await addProductToCart(item, token);
      succeeded.push(item);
    } catch (error) {
      console.error("[CART SYNC] Failed to sync item:", item);
      console.error("[CART SYNC] Error details:", {
        status: error.status,
        message: error.message,
        errors: error.errors,
        data: error.data,
        fullError: error,
      });
      failed.push({ item, error });
    }
  }

  return { succeeded, failed };
};
