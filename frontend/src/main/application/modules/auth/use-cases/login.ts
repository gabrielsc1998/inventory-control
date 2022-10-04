import { Login } from "domain/modules/auth/use-cases";
import { LoginUseCase } from "application/modules/auth/use-cases/login";
import { makeServiceAPI } from "main/application/services/api";
import { makeLocalStorageGateway } from "main/infra/gateways/local-storage";

export const makeLoginUseCase = (): Login => {
  const localStorage = makeLocalStorageGateway();
  const serviceAPI = makeServiceAPI();
  const loginUseCase = new LoginUseCase(serviceAPI, localStorage);
  return loginUseCase;
};
