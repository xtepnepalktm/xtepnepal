import { call, put, takeLatest } from "redux-saga/effects";

import {
  getVendorDetailRequest,
  getVendorDetailSuccess,
  getVendorDetailFailure,
} from "../actions";

import { getVendorDetails } from "@/api";

function* fetchVendorSaga() {
  try {
    const response = yield call(getVendorDetails);

    yield put(getVendorDetailSuccess(response));
  } catch (error) {
    yield put(getVendorDetailFailure());
  }
}

export function* watchVendorSaga() {
  yield takeLatest(getVendorDetailRequest, fetchVendorSaga);
}
