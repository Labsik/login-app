import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
} from "./authSlice";
import { axiosInstance } from "@services/axiosInstance";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "./authSlice.types";

export const NAVIGATE = "NAVIGATE";

export const navigateTo = (path: string) => ({
  type: NAVIGATE,
  payload: path,
});

function* loginSaga(action: PayloadAction<LoginPayload>) {
  try {
    const { data } = yield call(axiosInstance.post, "/login", action.payload);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    yield put(loginSuccess(data));
    yield put(navigateTo("/"));
  } catch (error) {
    // Need to catch the error
    console.log(error);
    yield put(loginFailure("Login failed"));
  }
}

function* refreshAuthTokenSaga() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = yield call(axiosInstance.post, "/refresh", {
      refreshToken,
    });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    yield put(refreshTokenSuccess());
  } catch (error) {
    console.log(error);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    yield put(refreshTokenFailure());
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(refreshTokenRequest.type, refreshAuthTokenSaga);
}
