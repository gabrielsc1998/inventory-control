import { CategoryRepository } from "@/domain/modules/category/repository";
import { CheckIfExistCategory } from "@/domain/modules/category/use-cases";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";

import { CheckIfExistCategoryUseCase } from "..";

type SUT = {
  repository: CategoryRepository;
  checkIfExistsCategory: CheckIfExistCategory;
};

const makeSut = (): SUT => {
  const repository = new CategoryRepositoryInMemory();
  const checkIfExistsCategory = new CheckIfExistCategoryUseCase(repository);

  return {
    repository,
    checkIfExistsCategory,
  };
};

let sut: SUT = null;

const mocks = {
  category: { id: "1", name: "cat-1" },
};

describe("Check Ff Exists Category [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    await sut.repository.create(mocks.category);
  });

  beforeEach(() => jest.clearAllMocks());

  it("should return a category successfully", async () => {
    const input: CheckIfExistCategory.Input = {
      id: mocks.category.id,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.checkIfExistsCategory.execute(input);

    expect(output).toBeTruthy();
    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the category is not found", async () => {
    const input: CheckIfExistCategory.Input = {
      id: "inexistent-category-id",
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.checkIfExistsCategory.execute(input);

    expect(output).toBeFalsy();
    expect(spyRepoFindById).toBeCalledWith(input.id);
  });
});
