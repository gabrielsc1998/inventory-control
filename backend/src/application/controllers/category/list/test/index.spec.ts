import { ok, noContent } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { ListCategories } from "@/domain/modules/category/use-cases";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";
import { ListCategoriesUseCase } from "@/application/modules/category/use-cases/list";

import { ListCategoriesController } from "..";

type SUT = {
  listCategoriesUseCase: ListCategories;
  listCategoriesController: Controller;
};

const mocks = {
  categories: [
    {
      id: "1",
      name: "cat-1",
    },
    {
      id: "2",
      name: "cat-2",
    },
    {
      id: "3",
      name: "cat-3",
    },
    {
      id: "4",
      name: "cat-4",
    },
    {
      id: "5",
      name: "cat-5",
    },
  ],
};

const makeSut = (): SUT => {
  const productRepository = new CategoryRepositoryInMemory();
  const listCategoriesUseCase = new ListCategoriesUseCase(productRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return {
    listCategoriesUseCase,
    listCategoriesController,
  };
};

let sut: SUT = null;

describe("List Categories [ Controller ]", () => {
  beforeAll(async () => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should list all categories successfully", async () => {
    jest
      .spyOn(sut.listCategoriesUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mocks.categories));

    const output = await sut.listCategoriesController.handle({});

    expect(output).toMatchObject(ok(mocks.categories));
  });

  it("should receive an empty array when not exists categories", async () => {
    jest
      .spyOn(sut.listCategoriesUseCase, "execute")
      .mockImplementation(() => Promise.resolve([]));

    const output = await sut.listCategoriesController.handle({});

    expect(output).toMatchObject(noContent());
  });
});
