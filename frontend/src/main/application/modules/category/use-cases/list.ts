import { makeServiceAPI } from "main/application/services/api";
import { ListCategories } from "domain/modules/category/use-cases";
import { ListCategoriesUseCase } from "application/modules/category/use-cases/list";

export const makeListCategoriesUseCase = (): ListCategories => {
  const serviceAPI = makeServiceAPI();
  const listCategoriesUseCase = new ListCategoriesUseCase(serviceAPI);
  return listCategoriesUseCase;
};
