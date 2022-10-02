import { CategoryRepository } from "@/domain/modules/category/repository";
import { CategoryRepositoryMySQL } from "@/infra/repositories/category/mysql";

export const makeCategoryRepository = (): CategoryRepository => {
  return new CategoryRepositoryMySQL();
};
