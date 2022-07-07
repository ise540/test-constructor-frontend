import axios, { AxiosRequestConfig } from "axios";

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


export default $api;
