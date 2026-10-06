import { call, put, takeLatest } from "redux-saga/effects";

import {
  getCartDataRequest,
  getCartDataSuccess,
  getCartDataFailure,
} from "../actions";

import { getCartData } from "@/api";

function* fetchCartSaga() {
  try {
    const response = yield call(getCartData);

    // Handle the API response which may have data wrapped in response.data
    const cartItems = response.data || response;

    // Only update cart if response is valid and is an array
    if (Array.isArray(cartItems)) {
      yield put(getCartDataSuccess(cartItems));
    } else {
      // Clear cart if response is invalid
      yield put(getCartDataSuccess([]));
    }
  } catch (error) {
    // Clear cart on error (including 401 auth errors)
    yield put(getCartDataSuccess([]));
    yield put(getCartDataFailure());
  }
}

export function* watchCartSaga() {
  yield takeLatest(getCartDataRequest, fetchCartSaga);
}
