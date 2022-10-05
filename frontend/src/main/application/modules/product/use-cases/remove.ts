import { makeServiceAPI } from "main/application/services/api";
import { RemoveProducts } from "domain/modules/product/use-cases";
import { RemoveProductsUseCase } from "application/modules/product/use-cases/remove";

export const makeRemoveProductsUseCase = (): RemoveProducts => {
  const serviceAPI = makeServiceAPI();
  const removeProductsUseCase = new RemoveProductsUseCase(serviceAPI);
  return removeProductsUseCase;
};
