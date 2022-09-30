import {
  idGeneratorMock,
  IDGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { NotFoundError } from "@/domain/errors";
import { badRequest, notFound, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { CheckIfExistCategory } from "@/domain/modules/category/use-cases";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";
import { CreateProductUseCase } from "@/application/modules/product/use-cases/create";
import { CheckIfExistCategoryUseCase } from "@/application/modules/category/use-cases/check-if-exists";

import { CreateProductController } from "..";

type SUT = {
  checkIfExistCategory: CheckIfExistCategory;
  createProductController: Controller;
};

const makeSut = (): SUT => {
  const idGeneratorMock = IDGeneratorMock;
  const productRepository = new ProductRepositoryInMemory();
  const createProductUseCase = new CreateProductUseCase(
    idGeneratorMock,
    productRepository
  );

  const categoryRepository = new CategoryRepositoryInMemory();
  const checkIfExistCategory = new CheckIfExistCategoryUseCase(
    categoryRepository
  );

  const createProductController = new CreateProductController(
    createProductUseCase,
    checkIfExistCategory
  );

  return {
    checkIfExistCategory,
    createProductController,
  };
};

let sut: SUT = null;

describe("Create Product [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create a product successfully", async () => {
    const input = {
      body: {
        categoryId: "1",
        name: "new-product",
      },
    };

    const spyCheckIfExists = jest
      .spyOn(sut.checkIfExistCategory, "execute")
      .mockImplementation(() => Promise.resolve(true));

    const output = await sut.createProductController.handle(input);

    expect(output).toMatchObject(
      ok({
        id: idGeneratorMock.generatedId,
      })
    );

    expect(spyCheckIfExists).toBeCalledWith({ id: input.body.categoryId });
  });

  it("should return error when the category not exists", async () => {
    const input = {
      body: {
        categoryId: "inexistent-category-id",
        name: "new-product",
      },
    };

    const spyCheckIfExists = jest
      .spyOn(sut.checkIfExistCategory, "execute")
      .mockImplementation(() => Promise.resolve(false));

    const output = await sut.createProductController.handle(input);

    expect(output).toMatchObject(notFound(new NotFoundError("Category")));
    expect(spyCheckIfExists).toBeCalledWith({ id: input.body.categoryId });
  });

  it("should return an error when the input is null", async () => {
    const output = await sut.createProductController.handle(null);
    expect(output).toMatchObject(badRequest(new Error(`name not provided`)));
  });

  it("should return an error when the name is null", async () => {
    const output = await sut.createProductController.handle({
      body: { name: null, categoryId: "1" },
    });
    expect(output).toMatchObject(badRequest(new Error(`name not provided`)));
  });

  it("should return an error when the categoryId is null", async () => {
    const output = await sut.createProductController.handle({
      body: { name: "product-name", categoryId: null },
    });
    expect(output).toMatchObject(
      badRequest(new Error(`categoryId not provided`))
    );
  });
});
