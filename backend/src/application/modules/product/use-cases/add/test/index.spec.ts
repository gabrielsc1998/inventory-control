import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { AddProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

import { AddProductUseCase } from "..";

type SUT = {
  repository: ProductRepository;
  addProduct: AddProduct;
};

const makeSut = (): SUT => {
  const repository = new ProductRepositoryInMemory();
  const addProduct = new AddProductUseCase(repository);

  return {
    repository,
    addProduct,
  };
};

let sut: SUT = null;

const mocks = {
  product: { id: "1", name: "prod-1", categoryId: "1", quantity: 1 },
};

describe("Add Product [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    await sut.repository.create(mocks.product);
  });

  beforeEach(() => jest.clearAllMocks());

  it("should add products with success", async () => {
    const input: AddProduct.Input = {
      id: mocks.product.id,
      quantity: 10,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.addProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({
      id: input.id,
      quantity: input.quantity + mocks.product.quantity,
    });
    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the product is not found", async () => {
    const input: AddProduct.Input = {
      id: "inexistent-product-id",
      quantity: 10,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.addProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new NotFoundError(`Product [id = ${input.id}]`)
    );

    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the input is null", async () => {
    const input: AddProduct.Input = null;

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.addProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidParamError(`add product input`));

    expect(spyRepoFindById).not.toBeCalled();
  });
});
