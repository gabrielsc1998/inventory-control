import { RemoveProductController } from "@/application/controllers/product";

import { makeRemoveProductUseCase } from "../../modules/product/use-cases";

export const makeRemoveProductController = (): RemoveProductController => {
  const removeProductUseCase = makeRemoveProductUseCase();
  return new RemoveProductController(removeProductUseCase);
};
