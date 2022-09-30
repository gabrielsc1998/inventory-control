import { AddProductController } from "@/application/controllers/product";

import { makeAddProductUseCase } from "../../modules/product/use-cases";

export const makeAddProductController = (): AddProductController => {
  const addProductUseCase = makeAddProductUseCase();
  return new AddProductController(addProductUseCase);
};
