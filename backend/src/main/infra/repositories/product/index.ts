import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryMySQL } from "@/infra/repositories/product/mysql";

export const makeProductRepository = (): ProductRepository => {
  return new ProductRepositoryMySQL();
};
