import { RefreshToken } from "domain/modules/auth/use-cases";
import { makeServiceAPI } from "main/application/services/api";
import { makeDomainStorageGateway } from "main/infra/gateways/domain-storage";
import { RefreshTokenUseCase } from "application/modules/auth/use-cases/refresh-token";

export const makeRefreshTokenUseCase = (): RefreshToken => {
  const serviceAPI = makeServiceAPI();
  const domainStorage = makeDomainStorageGateway();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    serviceAPI,
    domainStorage
  );
  return refreshTokenUseCase;
};
