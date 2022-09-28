import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { GetOneProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

import { GetOneProductUseCase } from "..";

type SUT = {
  repository: ProductRepository;
  getOneProduct: GetOneProduct;
};

const makeSut = (): SUT => {
  const repository = new ProductRepositoryInMemory();
  const getOneProduct = new GetOneProductUseCase(repository);

  return {
    repository,
    getOneProduct,
  };
};

let sut: SUT = null;

const mocks = {
  product: { id: "1", name: "prod-1", categoryId: "1", quantity: 1 },
};

describe("Get One Product [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    await sut.repository.create(mocks.product);
  });

  beforeEach(() => jest.clearAllMocks());

  it("should return a product with success", async () => {
    const input: GetOneProduct.Input = {
      id: mocks.product.id,
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.getOneProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeFalsy();
    expect(output).toMatchObject({
      ...mocks.product,
      categoryName: "category-name",
    });
    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the product is not found", async () => {
    const input: GetOneProduct.Input = {
      id: "inexistent-product-id",
    };

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.getOneProduct.execute(input);
    const hasError = output instanceof NotFoundError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new NotFoundError(`Product [id = ${input.id}]`)
    );

    expect(spyRepoFindById).toBeCalledWith(input.id);
  });

  it("should return an error when the input is null", async () => {
    const input: GetOneProduct.Input = null;

    const spyRepoFindById = jest.spyOn(sut.repository, "findById");

    const output = await sut.getOneProduct.execute(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(
      new InvalidParamError(`get one product input`)
    );

    expect(spyRepoFindById).not.toBeCalled();
  });
});
