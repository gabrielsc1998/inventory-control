import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { Controller } from "@/application/contracts/controllers";
import { badRequest, notFound, ok } from "@/application/helpers";
import { GetOneProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { GetOneProductUseCase } from "@/application/modules/product/use-cases/get-one";

import { GetOneProductController } from "..";

type SUT = {
  repository: ProductRepository;
  getOneProductController: Controller;
  getOneProductUseCase: GetOneProduct;
};

const mocks = {
  product: { id: "1", name: "prod-1", categoryId: "1", quantity: 1 },
};

const makeSut = (): SUT => {
  const productRepository = new ProductRepositoryInMemory();
  const getOneProductUseCase = new GetOneProductUseCase(productRepository);

  const getOneProductController = new GetOneProductController(
    getOneProductUseCase
  );

  return {
    repository: productRepository,
    getOneProductController,
    getOneProductUseCase,
  };
};

let sut: SUT = null;

describe("Get One Product [ Controller ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    await sut.repository.create(mocks.product);
  });
  beforeEach(() => jest.clearAllMocks());

  it("should get a product successfully", async () => {
    const input = {
      params: {
        id: mocks.product.id,
      },
    };

    const output = await sut.getOneProductController.handle(input);

    expect(output).toMatchObject(ok(mocks.product));
  });

  it("should return an error when the product not exists", async () => {
    const input = {
      params: {
        id: "inexistent-product-id",
      },
    };

    jest.spyOn(sut.repository, "findById").mockResolvedValue(null);
    const output = await sut.getOneProductController.handle(input);

    expect(output).toMatchObject(
      notFound(new NotFoundError(`Product [id = ${input.params.id}]`))
    );
  });

  it("should return an error when the input is null", async () => {
    const output = await sut.getOneProductController.handle(null);
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the id is null", async () => {
    const output = await sut.getOneProductController.handle({
      params: { id: null },
    });
    expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  });

  it("should return an error when the use case find a invalid param", async () => {
    const input = {
      params: {
        id: "invalid-id",
      },
    };

    const mockError = new InvalidParamError(`id`);

    jest
      .spyOn(sut.getOneProductUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockError));

    const output = await sut.getOneProductController.handle(input);

    expect(output).toMatchObject(badRequest(mockError));
  });
});
