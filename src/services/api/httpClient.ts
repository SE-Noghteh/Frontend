import axios from "axios";

import { getAccessToken } from "@/services/api/authToken";

const DEFAULT_API_BASE_URL = "https://senoghteh.fpna.ir/v1";

export const httpClient = axios.create({
  baseURL:
    (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ??
    DEFAULT_API_BASE_URL,
  timeout: 20_000,
  headers: {
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
