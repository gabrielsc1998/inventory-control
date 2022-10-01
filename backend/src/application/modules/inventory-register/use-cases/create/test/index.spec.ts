import {
  IDGeneratorMock,
  idGeneratorMock,
} from "@/common/tests/mocks/infra/gateways";
import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { InventoryRegisterType } from "@/domain/modules/inventory-register/types";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";
import { InventoryRegisterRepositoryInMemory } from "@/infra/repositories/inventory-register/memory";

import { CreateInventoryRegisterUseCase } from "..";

type SUT = {
  idGenerator: IDGenerator;
  repository: InventoryRegisterRepository;
  createInventoryRegister: CreateInventoryRegister;
};

const makeSut = (): SUT => {
  const idGenerator = IDGeneratorMock;
  const repository = new InventoryRegisterRepositoryInMemory();
  const createInventoryRegister = new CreateInventoryRegisterUseCase(
    idGenerator,
    repository
  );

  return {
    idGenerator,
    repository,
    createInventoryRegister,
  };
};

let sut: SUT = null;

describe("Create Inventory Register [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create a register successfully", async () => {
    const input: CreateInventoryRegister.Input = {
      productId: "product-id",
      quantity: 10,
      type: InventoryRegisterType.INPUT,
    };

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createInventoryRegister.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({ id: idGeneratorMock.generatedId });
    expect(spyRepoCreate).toBeCalled();
    expect(spyIdGenerator).toBeCalled();
  });

  it("should return an error when the input is null", async () => {
    const input: CreateInventoryRegister.Input = null;

    const spyRepoCreate = jest.spyOn(sut.repository, "create");
    const spyIdGenerator = jest.spyOn(sut.idGenerator, "generate");

    const output = await sut.createInventoryRegister.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new InvalidParamError("create inventory register input")
    );

    expect(spyIdGenerator).not.toBeCalled();
    expect(spyRepoCreate).not.toBeCalled();
  });
});
