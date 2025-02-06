import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
} from "./userSlice";
import { axiosInstance } from "@services/axiosInstance";
import { refreshTokenRequest } from "@store/auth/authSlice";

function* fetchUserSaga() {
  try {
    yield put(refreshTokenRequest());
    const { data } = yield call(axiosInstance.get, "/me");
    yield put(fetchUserSuccess(data));
  } catch (error) {
    // Need to catch the error
    console.log(error);
    yield put(fetchUserFailure("Failed to fetch user"));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}
