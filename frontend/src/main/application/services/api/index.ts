import { ServiceAPI } from "application/contracts/services/api";
import { makeLocalStorageGateway } from "main/infra/gateways/local-storage";
import { ServiceAPIAxiosAdapter } from "application/services/api/axios-adapter";

export const makeServiceAPI = (): ServiceAPI => {
  const localStorage = makeLocalStorageGateway();
  const serviceAPI = new ServiceAPIAxiosAdapter(localStorage);
  return serviceAPI;
};
