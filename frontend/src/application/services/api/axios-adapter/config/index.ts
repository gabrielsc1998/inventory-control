import { AxiosRequestConfig } from "axios";

export const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
};
