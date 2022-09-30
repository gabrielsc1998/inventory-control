import { AddProduct } from "@/domain/modules/product/use-cases";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { AddProductUseCase } from "@/application/modules/product/use-cases";

export const makeAddProductUseCase = (): AddProduct => {
  const repository = makeProductRepository();
  return new AddProductUseCase(repository);
};
