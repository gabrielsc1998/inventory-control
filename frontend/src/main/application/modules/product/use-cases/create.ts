import { makeServiceAPI } from "main/application/services/api";
import { CreateProduct } from "domain/modules/product/use-cases";
import { CreateProductUseCase } from "application/modules/product/use-cases/create";

export const makeCreateProductUseCase = (): CreateProduct => {
  const serviceAPI = makeServiceAPI();
  const createProductUseCase = new CreateProductUseCase(serviceAPI);
  return createProductUseCase;
};
