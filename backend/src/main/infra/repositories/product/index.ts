import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

export const makeProductRepository = (): ProductRepository => {
  return new ProductRepositoryInMemory();
};
