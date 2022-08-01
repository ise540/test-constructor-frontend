import axios, { AxiosRequestConfig } from "axios";
import AuthService from "../services/AuthService";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:8080/api",
});

export function getConfig(token?: string, params?: any): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "application/json",
    },
  };

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  if (params) {
    config.params = params;
  }

  return config;
}

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (
      error.response.status === 401 &&
      originalRequest &&
      !error.config._isRetry
    ) {
      try {
        const response = await AuthService.refresh();
        localStorage.setItem("accessToken", response.data.accessToken);
        error.config._isRetry = true;
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers!.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default $api;
