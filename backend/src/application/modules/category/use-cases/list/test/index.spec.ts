import { ListCategories } from "@/domain/modules/category/use-cases";
import { CategoryRepository } from "@/domain/modules/category/repository";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";

import { ListCategoriesUseCase } from "..";

type SUT = {
  repository: CategoryRepository;
  listCategories: ListCategories;
};

const makeSut = (): SUT => {
  const repository = new CategoryRepositoryInMemory();
  const listCategories = new ListCategoriesUseCase(repository);

  return {
    repository,
    listCategories,
  };
};

let sut: SUT = null;

const mocks = {
  categories: [
    { id: "1", name: "cat-1" },
    { id: "2", name: "cat-2" },
    { id: "3", name: "cat-3" },
  ],
};

describe("Create Category [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    for await (const category of mocks.categories) {
      await sut.repository.create(category);
    }
  });

  it("should list all categories", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const output = await sut.listCategories.execute();

    expect(output).toMatchObject(mocks.categories);
    expect(spyRepoFindAll).toBeCalled();
  });
});
