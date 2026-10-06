import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {},
  userToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { customer, token } = action.payload;

      state.isLogin = true;

      state.user = customer;

      state.userToken = token;
    },

    clearUser: (state) => {
      state.isLogin = false;

      state.user = {};

      state.userToken = "";
    },

    setUserToken: (state, action) => {
      state.isLogin = true;

      state.userToken = action.payload;
    },
  },
});
