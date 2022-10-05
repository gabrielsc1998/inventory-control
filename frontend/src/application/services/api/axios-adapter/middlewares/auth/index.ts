import { AxiosRequestConfig } from "axios";

import { LOCAL_STORAGE } from "common/keys";
import { LocalStorage } from "domain/contracts/gateways";

export const tokenMiddleware = (localStorage: LocalStorage) => {
  return async (config: AxiosRequestConfig) => {
    const token = localStorage.get({ key: LOCAL_STORAGE.TOKEN });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };
};
