import { IDGenerator } from "@/domain/contracts/gateways";
import { IDGeneratorCryptoAdapter } from "@/infra/gateways";

export const makeIdGenerator = (): IDGenerator => {
  return IDGeneratorCryptoAdapter;
};
