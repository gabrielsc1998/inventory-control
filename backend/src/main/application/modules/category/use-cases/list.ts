import { ListCategories } from "@/domain/modules/category/use-cases";
import { makeCategoryRepository } from "@/main/infra/repositories/category";
import { ListCategoriesUseCase } from "@/application/modules/category/use-cases/list";

export const makeListCategoriesUseCase = (): ListCategories => {
  const repository = makeCategoryRepository();
  return new ListCategoriesUseCase(repository);
};
