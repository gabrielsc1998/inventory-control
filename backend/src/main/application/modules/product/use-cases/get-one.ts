import { GetOneProduct } from "@/domain/modules/product/use-cases";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { GetOneProductUseCase } from "@/application/modules/product/use-cases";

export const makeGetOneProductUseCase = (): GetOneProduct => {
  const repository = makeProductRepository();
  return new GetOneProductUseCase(repository);
};
