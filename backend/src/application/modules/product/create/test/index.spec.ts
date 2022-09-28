import {
  IDGeneratorMock,
  idGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { CreateProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

import { CreateProductUseCase } from "..";

type SUT = {
  idGenerator: IDGenerator;
  repository: ProductRepository;
  createProduct: CreateProduct;
};

const makeSut = (): SUT => {
  const idGenerator = IDGeneratorMock;
  const repository = new ProductRepositoryInMemory();
  const createProduct = new CreateProductUseCase(idGenerator, repository);

  return {
    idGenerator,
    repository,
    createProduct,
  };
};

let sut: SUT = null;

describe("Create Category [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create a category with success", async () => {
    const input: CreateProduct.Input = {
      name: "name",
      categoryId: "category-id",
    };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({ id: idGeneratorMock.generatedId });
    expect(spyRepoCreate).toBeCalled();
    expect(spyIdGenerator).toBeCalled();
  });

  it("should return an error when the input is null", async () => {
    const input: CreateProduct.Input = null;

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidParamError("create product input"));

    expect(spyIdGenerator).not.toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });

  it("should return an error when the name is null", async () => {
    const input: CreateProduct.Input = {
      name: null,
      categoryId: "category-id",
    };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidParamError(`name - ${input.name}`));

    expect(spyIdGenerator).toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });

  it("should return an error when the categoryId is null", async () => {
    const input: CreateProduct.Input = { name: "name", categoryId: null };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new InvalidParamError(`categoryId - ${input.categoryId}`)
    );

    expect(spyIdGenerator).toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });
});
