import { Login } from "domain/modules/auth/use-cases";
import { makeServiceAPI } from "main/application/services/api";
import { LoginUseCase } from "application/modules/auth/use-cases/login";
import { makeDomainStorageGateway } from "main/infra/gateways/domain-storage";

export const makeLoginUseCase = (): Login => {
  const domainStorage = makeDomainStorageGateway();
  const serviceAPI = makeServiceAPI();
  const loginUseCase = new LoginUseCase(serviceAPI, domainStorage);
  return loginUseCase;
};
