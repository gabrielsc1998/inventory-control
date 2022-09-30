import { RemoveProduct } from "@/domain/modules/product/use-cases";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { RemoveProductUseCase } from "@/application/modules/product/use-cases";

export const makeRemoveProductUseCase = (): RemoveProduct => {
  const repository = makeProductRepository();
  return new RemoveProductUseCase(repository);
};
