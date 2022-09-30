import { badRequest, notFound, ok } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { RemoveProductUseCase } from "@/application/modules/product/use-cases/remove";

import { RemoveProductController } from "..";

type SUT = {
  removeProductUseCase: RemoveProductUseCase;
  removeProductController: Controller;
};

const makeSut = (): SUT => {
  const productRepository = new ProductRepositoryInMemory();
  const removeProductUseCase = new RemoveProductUseCase(productRepository);

  const removeProductController = new RemoveProductController(
    removeProductUseCase
  );

  return {
    removeProductUseCase,
    removeProductController,
  };
};

let sut: SUT = null;

describe("Remove Product [ Controller ]", () => {
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

    const output = await sut.removeProductController.handle(input);

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
      .spyOn(sut.removeProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.removeProductController.handle(input);

    expect(output).toMatchObject(notFound(mockError));
    expect(spyUseCase).toBeCalledWith(input.body);
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
