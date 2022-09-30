import { CreateCategoryController } from "@/application/controllers/category";

import { makeCreateCategoryUseCase } from "../../modules/category/use-cases";

export const makeCreateCategoryController = (): CreateCategoryController => {
  const createCategoryUseCase = makeCreateCategoryUseCase();
  return new CreateCategoryController(createCategoryUseCase);
};
