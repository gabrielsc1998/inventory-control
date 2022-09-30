import { CreateCategory } from "@/domain/modules/category/use-cases";
import { makeIdGenerator } from "@/main/infra/gateways/id-generator";
import { makeCategoryRepository } from "@/main/infra/repositories/category";
import { CreateCategoryUseCase } from "@/application/modules/category/use-cases/create";

export const makeCreateCategoryUseCase = (): CreateCategory => {
  const idGenerator = makeIdGenerator();
  const repository = makeCategoryRepository();
  return new CreateCategoryUseCase(idGenerator, repository);
};
