import { makeServiceAPI } from "main/application/services/api";
import { CreateCategory } from "domain/modules/category/use-cases";
import { CreateCategoryUseCase } from "application/modules/category/use-cases/create";

export const makeCreateCategoryUseCase = (): CreateCategory => {
  const serviceAPI = makeServiceAPI();
  const createCategoryUseCase = new CreateCategoryUseCase(serviceAPI);
  return createCategoryUseCase;
};
