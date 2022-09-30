import {
  idGeneratorMock,
  IDGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { Controller } from "@/application/contracts/controllers";
import { badRequest, ok, unauthorized } from "@/application/helpers";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";
import { CreateCategoryUseCase } from "@/application/modules/category/use-cases/create";

import { CreateCategoryController } from "..";

type SUT = {
  createCategoryController: Controller;
};

const makeSut = (): SUT => {
  const idGeneratorMock = IDGeneratorMock;
  const categoryRepository = new CategoryRepositoryInMemory();
  const createCategoryUseCase = new CreateCategoryUseCase(
    idGeneratorMock,
    categoryRepository
  );

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return {
    createCategoryController,
  };
};

let sut: SUT = null;

describe("Create Category [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create a category successfully", async () => {
    const input = {
      body: {
        name: "new-category",
      },
    };

    const output = await sut.createCategoryController.handle(input);

    expect(output).toMatchObject(
      ok({
        id: idGeneratorMock.generatedId,
        name: input.body.name,
      })
    );
  });

  it("should return an error when the input is null", async () => {
    const output = await sut.createCategoryController.handle(null);
    expect(output).toMatchObject(badRequest(new Error(`name not provided`)));
  });

  it("should return an error when the name is null", async () => {
    const output = await sut.createCategoryController.handle({
      body: { name: null },
    });
    expect(output).toMatchObject(badRequest(new Error(`name not provided`)));
  });
});
