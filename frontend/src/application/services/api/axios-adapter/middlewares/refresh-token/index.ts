import axios, { AxiosError, AxiosInstance } from "axios";

import { LOCAL_STORAGE } from "common/keys";
import { LocalStorage } from "domain/contracts/gateways";
import { makeRefreshTokenUseCase } from "main/application/modules/auth/use-cases";

export const refreshTokenMiddleware = (
  client: AxiosInstance,
  localStorage: LocalStorage
) => {
  return async (responseError: AxiosError) => {
    responseError;
    const refreshTokenUseCase = makeRefreshTokenUseCase();
    const { statusText } = responseError.response;

    if (statusText === "Unauthorized") {
      const output = await refreshTokenUseCase.execute();
      const hasError = output instanceof Error;
      if (!hasError) {
        const token = localStorage.get({ key: LOCAL_STORAGE.TOKEN });

        if (token) {
          responseError.response.config.headers.Authorization = `Bearer ${token}`;
        }
        return Promise.resolve();
      }
    }

    return Promise.reject(responseError);
  };
};
