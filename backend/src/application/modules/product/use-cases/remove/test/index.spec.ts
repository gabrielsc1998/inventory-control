import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { RemoveProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

import { RemoveProductUseCase } from "..";

type SUT = {
  repository: ProductRepository;
  removeProduct: RemoveProduct;
};

const makeSut = (): SUT => {
  const repository = new ProductRepositoryInMemory();
  const removeProduct = new RemoveProductUseCase(repository);

  return {
    repository,
    removeProduct,
  };
};

let sut: SUT = null;

const mocks = {
  product: { id: "1", name: "prod-1", categoryId: "1", quantity: 10 },
};

describe("Remove Product [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    await sut.repository.create(mocks.product);
  });

  beforeEach(() => jest.clearAllMocks());

  it("should remove products with success", async () => {
    const input: RemoveProduct.Input = {
      id: mocks.product.id,
      quantity: 20,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.removeProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({
      id: input.id,
      quantity: 0,
    });
    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the product is not found", async () => {
    const input: RemoveProduct.Input = {
      id: "inexistent-product-id",
      quantity: 10,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.removeProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new NotFoundError(`Product [id = ${input.id}]`)
    );

    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the input is null", async () => {
    const input: RemoveProduct.Input = null;

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.removeProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidParamError(`remove product input`));

    expect(spyRepoFindById).not.toBeCalled();
  });
});
