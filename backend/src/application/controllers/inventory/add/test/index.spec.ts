import { badRequest, notFound, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { IDGeneratorMock } from "@/common/tests/mocks/infra/gateways";
import { AddProductUseCase } from "@/application/modules/product/use-cases/add";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { InventoryRegisterType } from "@/domain/modules/inventory-register/types";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { InventoryRegisterRepositoryInMemory } from "@/infra/repositories/inventory-register/memory";
import { CreateInventoryRegisterUseCase } from "@/application/modules/inventory-register/use-cases/create";

import { AddInventoryProductController } from "..";

type SUT = {
  addProductUseCase: AddProductUseCase;
  addProductController: Controller;
  createInventoryRegisterUseCase: CreateInventoryRegister;
};

const makeSut = (): SUT => {
  const productRepository = new ProductRepositoryInMemory();
  const addProductUseCase = new AddProductUseCase(productRepository);

  const idGeneretor = IDGeneratorMock;
  const registerRepository = new InventoryRegisterRepositoryInMemory();
  const createInventoryRegisterUseCase = new CreateInventoryRegisterUseCase(
    idGeneretor,
    registerRepository
  );

  const addProductController = new AddInventoryProductController(
    addProductUseCase,
    createInventoryRegisterUseCase
  );

  return {
    createInventoryRegisterUseCase,
    addProductUseCase,
    addProductController,
  };
};

let sut: SUT = null;

describe("Add Inventory Product [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should add a product successfully", async () => {
    const input = {
      body: {
        id: "1",
        quantity: 10,
      },
    };

    const mockUseCaseOutput = {
      id: input.body.id,
      quantity: input.body.quantity + 1,
    };
    const spyUseCase = jest
      .spyOn(sut.addProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockUseCaseOutput));

    const spyInventoryRegisterUseCase = jest.spyOn(
      sut.createInventoryRegisterUseCase,
      "execute"
    );

    const output = await sut.addProductController.handle(input);

    expect(output).toMatchObject(ok(mockUseCaseOutput));
    expect(spyUseCase).toBeCalledWith(input.body);
    expect(spyInventoryRegisterUseCase).toBeCalledWith({
      productId: input.body.id,
      quantity: input.body.quantity,
      type: InventoryRegisterType.INPUT,
    });
  });

  it("should return error when the product not exists", async () => {
    const input = {
      body: {
        id: "1",
        quantity: 10,
      },
    };

    const mockError = new NotFoundError(`Product [id = ${input.body.id}]`);
    const spyUseCase = jest
      .spyOn(sut.addProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const spyInventoryRegisterUseCase = jest.spyOn(
      sut.createInventoryRegisterUseCase,
      "execute"
    );

    const output = await sut.addProductController.handle(input);

    expect(output).toMatchObject(notFound(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
    expect(spyInventoryRegisterUseCase).not.toBeCalled();
  });

  it("should return an error when the input is null", async () => {
    const output = await sut.addProductController.handle(null);
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the id is null", async () => {
    const output = await sut.addProductController.handle({
      body: { id: null, quantity: 1 },
    });
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the quantity is null", async () => {
    const output = await sut.addProductController.handle({
      body: { id: "product-id", quantity: null },
    });
    expect(output).toMatchObject(
      badRequest(new Error(`quantity not provided`))
    );
  });

  it("should return an error when the use case find a invalid param", async () => {
    const input = {
      body: {
        id: "invalid-id",
        quantity: 10,
      },
    };

    const mockError = new InvalidParamError(`id`);
    const spyUseCase = jest
      .spyOn(sut.addProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.addProductController.handle(input);

    expect(output).toMatchObject(badRequest(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
  });
});
