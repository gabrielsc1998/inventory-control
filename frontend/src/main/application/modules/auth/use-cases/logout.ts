import { Logout } from "domain/modules/auth/use-cases";
import { LogoutUseCase } from "application/modules/auth/use-cases/logout";
import { makeDomainStorageGateway } from "main/infra/gateways/domain-storage";

export const makeLogoutUseCase = (): Logout => {
  const domainStorage = makeDomainStorageGateway();
  const logoutUseCase = new LogoutUseCase(domainStorage);
  return logoutUseCase;
};
