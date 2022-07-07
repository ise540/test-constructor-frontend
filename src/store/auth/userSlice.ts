import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../models/AuthResponse";
import { IUser } from "../../models/IUser";

interface UserState {
  user: IUser | null;
  token: string;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart(state) {
      state.isLoading = true;
    },
    fetchLoginSuccess(state, action: PayloadAction<AuthResponse>) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.accessToken;
      state.error = "";
    },
    fetchLoginError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchLogout(state) {
      state.isAuth = false;
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
    fetchRefreshSuccess(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.accessToken
    }
  },
});

export const { fetchStart, fetchLoginError, fetchLoginSuccess, fetchLogout, fetchRefreshSuccess } =
  userSlice.actions;
export default userSlice.reducer;
