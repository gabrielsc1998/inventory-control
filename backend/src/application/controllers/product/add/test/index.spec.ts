import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { badRequest, notFound, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { AddProductUseCase } from "@/application/modules/product/use-cases/add";

import { AddProductController } from "..";

type SUT = {
  addProductUseCase: AddProductUseCase;
  addProductController: Controller;
};

const makeSut = (): SUT => {
  const productRepository = new ProductRepositoryInMemory();
  const addProductUseCase = new AddProductUseCase(productRepository);

  const addProductController = new AddProductController(addProductUseCase);

  return {
    addProductUseCase,
    addProductController,
  };
};

let sut: SUT = null;

describe("Add Product [ Controller ]", () => {
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

    const output = await sut.addProductController.handle(input);

    expect(output).toMatchObject(ok(mockUseCaseOutput));
    expect(spyUseCase).toBeCalledWith(input.body);
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

    const output = await sut.addProductController.handle(input);

    expect(output).toMatchObject(notFound(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
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
