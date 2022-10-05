import { AxiosError } from "axios";

import { RELOAD } from "common/constants";
import { makeRefreshTokenUseCase } from "main/application/modules/auth/use-cases/refresh-token";

export const responseErrorMiddleware = () => {
  return async (responseError: AxiosError) => {
    responseError;
    const refreshTokenUseCase = makeRefreshTokenUseCase();
    const { statusText } = responseError.response;

    if (statusText === "Unauthorized") {
      const output = await refreshTokenUseCase.execute();
      const hasError = output instanceof Error;
      if (!hasError) {
        return new Error(RELOAD);
      }
    }

    return Promise.reject(responseError);
  };
};
