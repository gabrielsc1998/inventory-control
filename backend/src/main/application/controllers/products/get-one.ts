import { GetOneProductController } from "@/application/controllers/product";

import { makeGetOneProductUseCase } from "../../modules/product/use-cases";

export const makeGetOneProductController = (): GetOneProductController => {
  const getOneProductUseCase = makeGetOneProductUseCase();
  return new GetOneProductController(getOneProductUseCase);
};
