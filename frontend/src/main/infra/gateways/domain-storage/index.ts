import { DomainStorage } from "domain/contracts/gateways/domain-storage";
// import { LocalStorageGateway } from "infra/gateways/domain-storage/local-storage";
import { CookiesNookiesAdapter } from "infra/gateways/domain-storage/cookies/nookies-adapter";

export const makeDomainStorageGateway = (): DomainStorage => {
  // const domainStorage = new LocalStorageGateway();
  const domainStorage = new CookiesNookiesAdapter();
  return domainStorage;
};
