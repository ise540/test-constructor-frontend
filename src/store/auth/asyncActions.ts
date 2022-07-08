import $api, { getConfig } from "../../api/index";
import {
  fetchStart,
  fetchLoginError,
  fetchLoginSuccess,
  fetchLogout,
} from "./userSlice";
import { AppDispatch, RootState } from "../store";
import { AuthResponse } from "../../models/AuthResponse";

export const fetchUserRegistration =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchStart());
      const response = await $api.post<AuthResponse>("/user/registration", {
        email,
        password,
      });
      dispatch(fetchLoginSuccess(response.data));
      localStorage.setItem('accessToken', response.data.accessToken)

    } catch (e: any) {
      dispatch(fetchLoginError(e.response.data.error));
    }
  };

export const fetchUserLogin =
  (email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      
      dispatch(fetchStart());
      const response = await $api.post<AuthResponse>("/user/login", {
        email,
        password,
      });
      dispatch(fetchLoginSuccess(response.data));
      localStorage.setItem('accessToken', response.data.accessToken)
    } catch (e: any) {
      dispatch(fetchLoginError(e.response.data.message));
    }
  };

export const fetchUserLogout = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const state = getState();
    dispatch(fetchStart());
    await $api.post<AuthResponse>("/user/logout", getConfig(state.user.token));
    dispatch(fetchLogout());
    localStorage.removeItem('accessToken')
  } catch (e: any) {
    dispatch(fetchLoginError(e.response.data.message));
  }
};
