import { LocalStorage } from "domain/contracts/gateways";
import { LocalStorageGateway } from "infra/gateways/local-storage";

export const makeLocalStorageGateway = (): LocalStorage => {
  const localStorage = new LocalStorageGateway();
  return localStorage;
};
