import {
  idGeneratorMock,
  IDGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { InvalidParamError } from "@/domain/errors";
import { badRequest, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { CreateCategory } from "@/domain/modules/category/use-cases";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";
import { CreateCategoryUseCase } from "@/application/modules/category/use-cases/create";

import { CreateCategoryController } from "..";

type SUT = {
  createCategoryController: Controller;
  createCategoryUseCase: CreateCategory;
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
    createCategoryUseCase,
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

  it("should return an error when the use case find a invalid param", async () => {
    const input = {
      body: {
        name: "invalid-name",
      },
    };

    const mockError = new InvalidParamError(`id`);

    jest
      .spyOn(sut.createCategoryUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.createCategoryController.handle(input);

    expect(output).toMatchObject(badRequest(mockError));
  });
});
