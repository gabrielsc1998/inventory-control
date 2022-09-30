import { ListProductsController } from "@/application/controllers/product";

import { makeListProductsUseCase } from "../../modules/product/use-cases";

export const makeListProductsController = (): ListProductsController => {
  const listProductsUseCase = makeListProductsUseCase();
  return new ListProductsController(listProductsUseCase);
};
