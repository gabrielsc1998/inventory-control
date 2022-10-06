import { ServiceAPI } from "application/contracts/services/api";
import { makeDomainStorageGateway } from "main/infra/gateways/domain-storage";
import { ServiceAPIAxiosAdapter } from "application/services/api/axios-adapter";

export const makeServiceAPI = (): ServiceAPI => {
  const domainStorage = makeDomainStorageGateway();
  const serviceAPI = new ServiceAPIAxiosAdapter(domainStorage);
  return serviceAPI;
};
