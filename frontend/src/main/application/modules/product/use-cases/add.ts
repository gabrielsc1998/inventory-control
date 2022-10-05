import { makeServiceAPI } from "main/application/services/api";
import { AddProducts } from "domain/modules/product/use-cases";
import { AddProductsUseCase } from "application/modules/product/use-cases/add";

export const makeAddProductsUseCase = (): AddProducts => {
  const serviceAPI = makeServiceAPI();
  const addProductsUseCase = new AddProductsUseCase(serviceAPI);
  return addProductsUseCase;
};
