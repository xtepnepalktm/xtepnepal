import { createSlice } from "@reduxjs/toolkit";

const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FIXED: "fixed",
};

// Helper function to recalculate discount based on current cart state
const recalculateDiscount = (state) => {
  const { type, value, appliesTo, targetId, code, amount } = state.discount;

  // If no discount code is applied, return 0
  if (!code) return 0;

  // If we already have a fixed amount from server and no type/value to re-compute with
  if (!type && !value && amount > 0) {
    return Math.min(amount, state.subtotal);
  }

  let discountAmount = 0;

  if (!appliesTo || appliesTo === "all") {
    if (type === DISCOUNT_TYPES.PERCENTAGE || type === "percentage") {
      discountAmount = (state.subtotal * Number(value)) / 100;
    } else if (type === DISCOUNT_TYPES.FIXED || type === "fixed") {
      discountAmount = Number(value) || 0;
    } else if (amount > 0) {
      discountAmount = amount;
    }
  } else if (appliesTo === "category") {
    const categoryItemsSubtotal = state.items
      .filter((item) => (
        item.category_id === targetId ||
        item.category?.id === targetId ||
        item.category?.category_id === targetId
      ))
      .reduce((sum, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return sum + price * item.quantity;
      }, 0);

    if (categoryItemsSubtotal === 0) return 0;

    if (type === DISCOUNT_TYPES.PERCENTAGE || type === "percentage") {
      discountAmount = (categoryItemsSubtotal * Number(value)) / 100;
    } else if (type === DISCOUNT_TYPES.FIXED || type === "fixed") {
      discountAmount = Math.min(Number(value) || 0, categoryItemsSubtotal);
    }
  } else {
    const itemsSubtotal = state.items
      .filter((item) => (
        item.product_id == targetId ||
        item.itemable_id == targetId ||
        item.id == targetId ||
        item.variant_id == targetId
      ))
      .reduce((sum, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return sum + price * item.quantity;
      }, 0);

    if (itemsSubtotal === 0) return 0;

    if (type === DISCOUNT_TYPES.PERCENTAGE || type === "percentage") {
      discountAmount = (itemsSubtotal * Number(value)) / 100;
    } else if (type === DISCOUNT_TYPES.FIXED || type === "fixed") {
      discountAmount = Math.min(Number(value) || 0, itemsSubtotal);
    }
  }

  // Cap discount at subtotal to prevent negative totals
  return Math.min(discountAmount, state.subtotal);
};

const initialState = {
  isLoading: false,
  items: [],
  subtotal: 0,
  total: 0,
  discount: {
    appliesTo: "",
    targetId: "",
    code: "",
    type: "",
    value: 0,
    amount: 0,
  },
  shipping: 0,
  totalItems: 0,
  activeStep: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },

    getCartDataRequest: (state, action) => {
      state.isLoading = true;
    },

    getCartDataSuccess: (state, action) => {
      state.isLoading = false;

      state.items = action.payload;

      state.totalItems = state.items.length;

      state.subtotal = state.items.reduce((total, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return total + item.quantity * price;
      }, 0);

      state.discount.amount = recalculateDiscount(state);
      state.total = state.subtotal - state.discount.amount + state.shipping;
    },

    getCartDataFailure: (state) => {
      state.isLoading = false;
    },

    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.product_id == newItem.product_id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(newItem);
      }

      state.totalItems = state.items.length;

      state.subtotal = state.items.reduce((total, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return total + item.quantity * price;
      }, 0);

      state.discount.amount = recalculateDiscount(state);
      state.total = state.subtotal - state.discount.amount + state.shipping;
    },

    removeCartItem: (state, action) => {
      const cartId = action.payload;

      state.items = state.items.filter((item) => item.cart_id !== cartId);

      state.totalItems = state.items.length;

      state.subtotal = state.items.reduce((total, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return total + item.quantity * price;
      }, 0);

      state.discount.amount = recalculateDiscount(state);
      state.total = state.subtotal - state.discount.amount + state.shipping;
    },

    changeItemQuantity: (state, action) => {
      const { cartId, quantity } = action.payload;

      const item = state.items.find((item) => item.cart_id === cartId);

      if (item) {
        item.quantity = quantity;
      }

      state.totalItems = state.items.length;

      state.subtotal = state.items.reduce((total, item) => {
        const price = Number(item.price) || Number(item.regular_price) || 0;
        return total + item.quantity * price;
      }, 0);

      state.discount.amount = recalculateDiscount(state);
      state.total = state.subtotal - state.discount.amount + state.shipping;
    },

    setShippingCharge: (state, action) => {
      state.shipping = action.payload;

      state.total = state.subtotal - state.discount.amount + state.shipping;
    },

    setDiscount: (state, action) => {
      const payload = action.payload || {};

      // Handle multiple possible cart calculation API formats
      const isDiscountCodeObj = typeof payload.discount_code === "object" && payload.discount_code !== null;
      const isDiscountDetailsObj = typeof payload.discount_details === "object" && payload.discount_details !== null;
      const isDiscountObj = typeof payload.discount === "object" && payload.discount !== null;

      const discount_code = isDiscountCodeObj
        ? (payload.discount_code.code || payload.discount_code.discount_code || "")
        : isDiscountDetailsObj
          ? (payload.discount_details.discount_code || payload.discount_details.code || "")
          : (typeof payload.discount_code === "string" ? payload.discount_code : (payload.code || ""));

      const discount_type = isDiscountCodeObj
        ? payload.discount_code.type
        : isDiscountDetailsObj
          ? payload.discount_details.discount_type
          : (payload.discount_type || payload.type || "");

      const discount_value = Number(
        isDiscountCodeObj
          ? payload.discount_code.value
          : isDiscountDetailsObj
            ? payload.discount_details.discount_value
            : (payload.discount_value ?? payload.value ?? 0)
      ) || 0;

      const applies_to = isDiscountCodeObj
        ? payload.discount_code.applies_to
        : isDiscountDetailsObj
          ? payload.discount_details.applies_to
          : (payload.applies_to || "all");

      const target_id = isDiscountCodeObj
        ? (payload.discount_code.target || payload.discount_code.target_id || "")
        : isDiscountDetailsObj
          ? (payload.discount_details.target_id || "")
          : (payload.target_id || "");

      // Server provided discount amount if available
      const rawServerAmount = isDiscountObj
        ? payload.discount.amount
        : (payload.discount_amount ?? (typeof payload.discount === "number" ? payload.discount : null));
      const serverAmount = rawServerAmount !== null && rawServerAmount !== undefined ? Number(rawServerAmount) : null;

      state.discount = {
        appliesTo: applies_to || "all",
        code: discount_code,
        type: discount_type,
        value: discount_value,
        targetId: target_id,
        amount: 0,
      };

      let discountAmount = 0;
      if (serverAmount !== null && !isNaN(serverAmount) && serverAmount > 0) {
        discountAmount = serverAmount;
      } else {
        discountAmount = recalculateDiscount(state);
      }

      state.discount.amount = Math.min(discountAmount, state.subtotal);
      state.total = Math.max(0, state.subtotal - state.discount.amount + state.shipping);
    },

    removeDiscount: (state, action) => {
      state.discount = {
        appliesTo: "",
        targetId: "",
        code: "",
        type: "",
        value: 0,
        amount: 0,
      };

      state.total = state.subtotal + state.shipping;
    },

    resetCart: (state) => {
      Object.assign(state, initialState);
    },

    changeStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});
