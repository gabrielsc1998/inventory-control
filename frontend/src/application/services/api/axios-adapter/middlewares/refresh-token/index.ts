import { AxiosError, AxiosInstance } from "axios";

import {
  makeLogoutUseCase,
  makeRefreshTokenUseCase,
} from "main/application/modules/auth/use-cases";
import { STORAGE } from "common/keys";
import { SCREEN_ROUTES } from "presentation/routes";
import { DomainStorage } from "domain/contracts/gateways";

import { IGNORE_URLS } from "./config";

export const refreshTokenMiddleware = (
  client: AxiosInstance,
  domainStorage: DomainStorage
) => {
  return async (responseError: AxiosError) => {
    responseError;

    const { statusText, config } = responseError.response;

    const logout = async () => {
      const logoutUseCase = makeLogoutUseCase();
      logoutUseCase.execute();
      window.location.replace(SCREEN_ROUTES.LOGIN);
    };

    const shouldIgnoreThisUrl = IGNORE_URLS.includes(config.url);

    if (statusText === "Unauthorized" && !shouldIgnoreThisUrl) {
      const refreshTokenUseCase = makeRefreshTokenUseCase();
      const output = await refreshTokenUseCase.execute();
      const hasError = output instanceof Error || output.error;

      if (!hasError) {
        const token = domainStorage.get({ key: STORAGE.TOKEN });

        if (token) {
          responseError.response.config.headers.Authorization = `Bearer ${token}`;
        }

        return Promise.resolve();
      } else {
        logout();
      }
    }

    return Promise.reject(responseError);
  };
};
