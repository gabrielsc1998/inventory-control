import { CheckIfExistCategory } from "@/domain/modules/category/use-cases";
import { makeCategoryRepository } from "@/main/infra/repositories/category";
import { CheckIfExistCategoryUseCase } from "@/application/modules/category/use-cases";

export const makeCheckIfExistsCategoryUseCase = (): CheckIfExistCategory => {
  const repository = makeCategoryRepository();
  return new CheckIfExistCategoryUseCase(repository);
};
