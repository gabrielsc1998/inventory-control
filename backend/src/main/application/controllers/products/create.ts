import { CreateProductController } from "@/application/controllers/product";

import { makeCreateProductUseCase } from "../../modules/product/use-cases";
import { makeCheckIfExistsCategoryUseCase } from "../../modules/category/use-cases";

export const makeCreateProductController = (): CreateProductController => {
  const checkIfExistCategory = makeCheckIfExistsCategoryUseCase();
  const createProductUseCase = makeCreateProductUseCase();
  return new CreateProductController(
    createProductUseCase,
    checkIfExistCategory
  );
};
