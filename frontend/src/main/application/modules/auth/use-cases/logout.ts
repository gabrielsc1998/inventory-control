import { Logout } from "domain/modules/auth/use-cases";
import { LogoutUseCase } from "application/modules/auth/use-cases/logout";
import { makeLocalStorageGateway } from "main/infra/gateways/local-storage";

export const makeLogoutUseCase = (): Logout => {
  const localStorage = makeLocalStorageGateway();
  const logoutUseCase = new LogoutUseCase(localStorage);
  return logoutUseCase;
};
