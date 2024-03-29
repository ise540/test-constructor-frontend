import $api from "../api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }

  static async logout(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/logout");
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/refresh");
  }

  static async recover(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/password", { email });
  }

  static async setNewPassword(link: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`/user/password/${link}`, {password});
  }
}
