import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, User } from "./authSlice.types";

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state, _action: PayloadAction<User>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },

    refreshTokenRequest: (state) => {
      state.loading = true;
    },
    refreshTokenSuccess: (state) => {
      state.loading = false;
    },
    refreshTokenFailure: (state) => {
      state.loading = false;
      state.error = "Session expired. Please log in again";
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,

  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
} = authSlice.actions;

export default authSlice.reducer;
