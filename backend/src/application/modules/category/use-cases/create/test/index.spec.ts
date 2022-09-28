import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { CreateCategory } from "@/domain/modules/category/use-cases";
import {
  IDGeneratorMock,
  idGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { CategoryRepository } from "@/domain/modules/category/repository";
import { CategoryRepositoryInMemory } from "@/infra/repositories/category/memory";

import { CreateCategoryUseCase } from "..";

type SUT = {
  idGenerator: IDGenerator;
  repository: CategoryRepository;
  createCategory: CreateCategory;
};

const makeSut = (): SUT => {
  const idGenerator = IDGeneratorMock;
  const repository = new CategoryRepositoryInMemory();
  const createCategory = new CreateCategoryUseCase(idGenerator, repository);

  return {
    idGenerator,
    repository,
    createCategory,
  };
};

let sut: SUT = null;

describe("Create Category [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create a category with success", async () => {
    const input: CreateCategory.Input = {
      name: "name",
    };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createCategory.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({ ...input, id: idGeneratorMock.generatedId });
    expect(spyRepoCreate).toBeCalled();
    expect(spyIdGenerator).toBeCalled();
  });

  it("should return an error when the input is null", async () => {
    const input: CreateCategory.Input = null;

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createCategory.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new InvalidParamError("create category input")
    );

    expect(spyIdGenerator).not.toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });

  it("should return an error when the name is null", async () => {
    const input: CreateCategory.Input = { name: null };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createCategory.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidParamError(`name - ${input.name}`));

    expect(spyIdGenerator).toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });
});
