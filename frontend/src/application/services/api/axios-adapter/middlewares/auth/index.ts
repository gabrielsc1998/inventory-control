import { AxiosInstance, AxiosRequestConfig } from "axios";

import { LOCAL_STORAGE } from "common/keys";
import { LocalStorage } from "domain/contracts/gateways";

export const tokenMiddleware = (
  client: AxiosInstance,
  localStorage: LocalStorage
) => {
  return async (config: AxiosRequestConfig) => {
    const token = localStorage.get({ key: LOCAL_STORAGE.TOKEN });
    if (token) {
      client.defaults.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  };
};
