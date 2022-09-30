import { CategoryRepository } from "@/domain/modules/category/repository";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";

export const makeCategoryRepository = (): CategoryRepository => {
  return new CategoryRepositoryInMemory();
};
