import { CreateProduct } from "@/domain/modules/product/use-cases";
import { makeIdGenerator } from "@/main/infra/gateways/id-generator";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { CreateProductUseCase } from "@/application/modules/product/use-cases";

export const makeCreateProductUseCase = (): CreateProduct => {
  const idGenerator = makeIdGenerator();
  const repository = makeProductRepository();
  return new CreateProductUseCase(idGenerator, repository);
};
