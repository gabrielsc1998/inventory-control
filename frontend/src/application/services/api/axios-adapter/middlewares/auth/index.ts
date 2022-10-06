import { AxiosRequestConfig } from "axios";

import { STORAGE } from "common/keys";
import { DomainStorage } from "domain/contracts/gateways";

export const tokenMiddleware = (domainStorage: DomainStorage) => {
  return async (config: AxiosRequestConfig) => {
    const token = domainStorage.get({ key: STORAGE.TOKEN });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };
};
