import { badRequest, notFound, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { IDGeneratorMock } from "@/common/tests/mocks/infra/gateways";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { InventoryRegisterType } from "@/domain/modules/inventory-register/types";
import { RemoveProductUseCase } from "@/application/modules/product/use-cases/remove";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { InventoryRegisterRepositoryInMemory } from "@/infra/repositories/inventory-register/memory";
import { CreateInventoryRegisterUseCase } from "@/application/modules/inventory-register/use-cases/create";

import { RemoveInventoryProductController } from "..";

type SUT = {
  removeProductUseCase: RemoveProductUseCase;
  removeProductController: Controller;
  createInventoryRegisterUseCase: CreateInventoryRegister;
};

const makeSut = (): SUT => {
  const productRepository = new ProductRepositoryInMemory();
  const removeProductUseCase = new RemoveProductUseCase(productRepository);

  const idGeneretor = IDGeneratorMock;
  const registerRepository = new InventoryRegisterRepositoryInMemory();
  const createInventoryRegisterUseCase = new CreateInventoryRegisterUseCase(
    idGeneretor,
    registerRepository
  );

  const removeProductController = new RemoveInventoryProductController(
    removeProductUseCase,
    createInventoryRegisterUseCase
  );

  return {
    removeProductUseCase,
    removeProductController,
    createInventoryRegisterUseCase,
  };
};

let sut: SUT = null;

describe("Remove Inventory Product [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should remove products successfully", async () => {
    const input = {
      body: {
        id: "1",
        quantity: 10,
      },
    };

    const mockUseCaseOutput = {
      id: input.body.id,
      quantity: 20 - input.body.quantity,
    };
    const spyUseCase = jest
      .spyOn(sut.removeProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockUseCaseOutput));

    const spyInventoryRegisterUseCase = jest.spyOn(
      sut.createInventoryRegisterUseCase,
      "execute"
    );

    const output = await sut.removeProductController.handle(input);

    expect(output).toMatchObject(ok(mockUseCaseOutput));
    expect(spyUseCase).toBeCalledWith(input.body);
    expect(spyInventoryRegisterUseCase).toBeCalledWith({
      productId: input.body.id,
      quantity: input.body.quantity,
      type: InventoryRegisterType.OUTPUT,
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
      .spyOn(sut.removeProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const spyInventoryRegisterUseCase = jest.spyOn(
      sut.createInventoryRegisterUseCase,
      "execute"
    );

    const output = await sut.removeProductController.handle(input);

    expect(output).toMatchObject(notFound(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
    expect(spyInventoryRegisterUseCase).not.toBeCalled();
  });

  it("should return error when the quantity is unavailable", async () => {
    const input = {
      body: {
        id: "1",
        quantity: 100,
      },
    };

    const mockError = new Error(`Unavailable quantity`);
    const spyUseCase = jest
      .spyOn(sut.removeProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.removeProductController.handle(input);

    expect(output).toMatchObject(badRequest(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
  });

  it("should return an error when the input is null", async () => {
    const output = await sut.removeProductController.handle(null);
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the id is null", async () => {
    const output = await sut.removeProductController.handle({
      body: { id: null, quantity: 1 },
    });
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the quantity is null", async () => {
    const output = await sut.removeProductController.handle({
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
      .spyOn(sut.removeProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.removeProductController.handle(input);

    expect(output).toMatchObject(badRequest(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
  });
});
