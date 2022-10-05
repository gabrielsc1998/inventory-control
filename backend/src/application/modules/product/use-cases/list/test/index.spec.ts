import { PaginationGateway } from "@/infra/gateways";
import { ListProducts } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";

import { ListProductsUseCase } from "..";

type SUT = {
  repository: ProductRepository & { products: Array<any> };
  listProducts: ListProducts;
};

const makeSut = (): SUT => {
  const pagination = PaginationGateway;
  const repository = new ProductRepositoryInMemory();
  const listProducts = new ListProductsUseCase(repository, pagination);

  return {
    repository,
    listProducts,
  };
};

let sut: SUT = null;

const mocks = {
  products: [
    { id: "1", name: "prod-1", categoryId: "1", quantity: 1 },
    { id: "2", name: "prod-2", categoryId: "2", quantity: 2 },
    { id: "3", name: "prod-3", categoryId: "3", quantity: 3 },
  ],
};

describe("List Products [ Use Case ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    for await (const product of mocks.products) {
      await sut.repository.create(product);
    }
  });

  beforeEach(() => jest.clearAllMocks());

  it("should list all products [ without filters or pagination ]", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const output = await sut.listProducts.execute();

    expect(output).toMatchObject({
      data: mocks.products.map((product, index) => ({
        ...product,
        categoryName: `cat-name-${index}`,
      })),
      total: mocks.products.length,
    });
    expect(spyRepoFindAll).toBeCalledWith();
  });

  it("should list all products [ with filters | without pagination ]", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const input = {
      filters: {
        categoryId: "1",
      },
    };
    const output = await sut.listProducts.execute(input);

    expect(output).toMatchObject({
      data: [{ ...mocks.products[0], categoryName: `cat-name-${0}` }],
      total: 1,
    });

    expect(spyRepoFindAll).toBeCalledWith({ ...input, pagination: null });
  });

  it("should list all products [ without filters | with pagination ]", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const input = {
      pagination: {
        page: 0,
        size: 2,
      },
    };
    const output = await sut.listProducts.execute(input);

    expect(output).toMatchObject({
      data: [
        { ...mocks.products[0], categoryName: `cat-name-${0}` },
        { ...mocks.products[1], categoryName: `cat-name-${1}` },
      ],
      total: mocks.products.length,
    });

    expect(spyRepoFindAll).toBeCalledWith({
      pagination: PaginationGateway.create(input.pagination),
      filters: null,
    });
  });

  it("should list all products [ with filters | with pagination ]", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const input = {
      filters: {
        categoryId: "1",
      },
      pagination: {
        page: 0,
        size: 1,
      },
    };
    const output = await sut.listProducts.execute(input);

    expect(output).toMatchObject({
      data: [{ ...mocks.products[0], categoryName: `cat-name-${0}` }],
      total: 1,
    });

    expect(spyRepoFindAll).toBeCalledWith({
      pagination: PaginationGateway.create(input.pagination),
      filters: input.filters,
    });
  });

  it("should return an empty array when pagination overflows or array", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const input = {
      pagination: {
        page: 10,
        size: 10,
      },
    };
    const output = await sut.listProducts.execute(input);
    expect(output).toMatchObject({ data: [], total: mocks.products.length });

    expect(spyRepoFindAll).toBeCalledWith({
      pagination: PaginationGateway.create(input.pagination),
      filters: null,
    });
  });

  it("should return an empty array when the data not exists", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    const input = {
      filters: {
        categoryId: "10",
      },
    };
    const output = await sut.listProducts.execute(input);
    expect(output).toMatchObject({ data: [], total: 0 });

    expect(spyRepoFindAll).toBeCalledWith({ ...input, pagination: null });
  });

  it("should return an empty array when the data is empty", async () => {
    const spyRepoFindAll = jest.spyOn(sut.repository, "findAll");

    sut.repository.products = [];
    const output = await sut.listProducts.execute();
    expect(output).toMatchObject({ data: [], total: 0 });

    expect(spyRepoFindAll).toBeCalledWith();
  });
});
