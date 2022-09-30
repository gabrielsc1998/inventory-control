import { PaginationGateway } from "@/infra/gateways";
import { ok, noContent } from "@/application/helpers";
import { Controller } from "@/application/contracts/controllers";
import { ListProducts } from "@/domain/modules/product/use-cases";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/memory";
import { ListProductsUseCase } from "@/application/modules/product/use-cases/list";

import { ListProductsController } from "..";

type SUT = {
  listProductsUseCase: ListProducts;
  listProductsController: Controller;
};

const mocks = {
  products: [
    {
      id: "1",
      name: "prod-1",
      categoryId: "1",
      quantity: 1,
      categoryName: "cat-1",
    },
    {
      id: "2",
      name: "prod-2",
      categoryId: "2",
      quantity: 2,
      categoryName: "cat-2",
    },
    {
      id: "3",
      name: "prod-3",
      categoryId: "3",
      quantity: 3,
      categoryName: "cat-3",
    },
    {
      id: "4",
      name: "prod-4",
      categoryId: "4",
      quantity: 4,
      categoryName: "cat-4",
    },
    {
      id: "5",
      name: "prod-5",
      categoryId: "5",
      quantity: 5,
      categoryName: "cat-5",
    },
  ],
};

const makeSut = (): SUT => {
  const pagination = new PaginationGateway();
  const productRepository = new ProductRepositoryInMemory();
  const listProductsUseCase = new ListProductsUseCase(
    productRepository,
    pagination
  );

  const listProductsController = new ListProductsController(
    listProductsUseCase
  );

  return {
    listProductsUseCase,
    listProductsController,
  };
};

let sut: SUT = null;

describe("List Products [ Controller ]", () => {
  beforeAll(async () => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should list all products successfully", async () => {
    jest
      .spyOn(sut.listProductsUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mocks.products));

    const output = await sut.listProductsController.handle({});

    expect(output).toMatchObject(ok(mocks.products));
  });

  it("should receive an empty array when not exists products", async () => {
    jest
      .spyOn(sut.listProductsUseCase, "execute")
      .mockImplementation(() => Promise.resolve([]));

    const output = await sut.listProductsController.handle({});

    expect(output).toMatchObject(noContent());
  });

  it("should list two products successfully [ with pagination ]", async () => {
    const mockRet = [mocks.products[0], mocks.products[1]];

    const spyUseCase = jest
      .spyOn(sut.listProductsUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockRet));

    const input = {
      query: {
        pagination: {
          page: 0,
          size: 2,
        },
      },
    };
    const output = await sut.listProductsController.handle(input);

    expect(output).toMatchObject(ok(mockRet));
    expect(spyUseCase).toBeCalledWith(input.query);
  });

  it("should list one product successfully [ with filters ]", async () => {
    const mockRet = [mocks.products[0]];

    const spyUseCase = jest
      .spyOn(sut.listProductsUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockRet));

    const input = {
      query: {
        filters: {
          categoryId: mocks.products[0].categoryId,
        },
      },
    };

    const output = await sut.listProductsController.handle(input);

    expect(output).toMatchObject(ok(mockRet));
    expect(spyUseCase).toBeCalledWith(input.query);
  });

  it("should list one product successfully [ with filters and pagination ]", async () => {
    const mockRet = [mocks.products[0]];

    const spyUseCase = jest
      .spyOn(sut.listProductsUseCase, "execute")
      .mockImplementation(() => Promise.resolve(mockRet));

    const input = {
      query: {
        filters: {
          categoryId: mocks.products[0].categoryId,
        },
        pagination: {
          page: 0,
          size: 2,
        },
      },
    };

    const output = await sut.listProductsController.handle(input);

    expect(output).toMatchObject(ok(mockRet));
    expect(spyUseCase).toBeCalledWith(input.query);
  });

  // it("should return an error when the product not exists", async () => {
  //   const input = {
  //     query: {
  //       id: "inexistent-product-id",
  //     },
  //   };

  //   jest.spyOn(sut.listProductsUseCase, "execute").mockResolvedValue(null);
  //   const output = await sut.listProductsController.handle(input);

  //   expect(output).toMatchObject(
  //     notFound(new NotFoundError(`Product [id = ${input.query.id}]`))
  //   );
  // });

  // it("should return an error when the input is null", async () => {
  //   const output = await sut.listProductsController.handle(null);
  //   expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  // });

  // it("should return an error when the id is null", async () => {
  //   const output = await sut.listProductsController.handle({
  //     query: { id: null },
  //   });
  //   expect(output).toMatchObject(badRequest(new Error(`id not provided`)));
  // });
});
