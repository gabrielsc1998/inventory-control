import { makeServiceAPI } from "main/application/services/api";
import { ListProducts } from "domain/modules/product/use-cases";
import { ListProductsUseCase } from "application/modules/product/use-cases/list";

export const makeListProductsUseCase = (): ListProducts => {
  const serviceAPI = makeServiceAPI();
  const listProductsUseCase = new ListProductsUseCase(serviceAPI);
  return listProductsUseCase;
};
