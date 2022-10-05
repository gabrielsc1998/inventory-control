import { RefreshToken } from "domain/modules/auth/use-cases";
import { makeServiceAPI } from "main/application/services/api";
import { makeLocalStorageGateway } from "main/infra/gateways/local-storage";
import { RefreshTokenUseCase } from "application/modules/auth/use-cases/refresh-token";

export const makeRefreshTokenUseCase = (): RefreshToken => {
  const localStorage = makeLocalStorageGateway();
  const serviceAPI = makeServiceAPI();
  const refreshTokenUseCase = new RefreshTokenUseCase(serviceAPI, localStorage);
  return refreshTokenUseCase;
};
