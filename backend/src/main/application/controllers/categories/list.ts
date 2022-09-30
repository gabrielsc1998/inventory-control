import { ListCategoriesController } from "@/application/controllers/category";

import { makeListCategoriesUseCase } from "../../modules/category/use-cases";

export const makeListCategoriesController = (): ListCategoriesController => {
  const listCategoriesUseCase = makeListCategoriesUseCase();
  return new ListCategoriesController(listCategoriesUseCase);
};
