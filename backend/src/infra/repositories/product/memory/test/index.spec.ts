import { ProductRepository } from "@/domain/modules/product/repository";
import { ProductRepositoryInMemory } from "..";

type SUT = {
  repository: ProductRepository & { products: Array<any> };
};

const makeSut = (): SUT => {
  const repository = new ProductRepositoryInMemory();

  return {
    repository,
  };
};

let sut: SUT = null;

describe("Product Memory Repository [ Infra ]", () => {
  beforeAll(async () => {
    sut = makeSut();
    for (let i = 0; i < 10; i++) {
      await sut.repository.create({
        id: String(i),
        name: `prod-${i}`,
        categoryId: i < 5 ? "1" : "2",
        quantity: i,
      });
    }
  });

  it("should create a products", async () => {
    const product = await sut.repository.findById("0");
    expect(product).toMatchObject(sut.repository.products[0]);
  });

  it("should update a product", async () => {
    const product = await sut.repository.update({ id: "0", quantity: 500 });
    expect(product).toMatchObject({
      ...sut.repository.products[0],
      quantity: 500,
    });
  });

  it("should return null when try to update an inexistent product", async () => {
    const product = await sut.repository.update({ id: "1000", quantity: 500 });
    expect(product).toBeNull();
  });

  it("should get a product by id", async () => {
    const product = await sut.repository.findById("0");
    expect(product).toMatchObject(sut.repository.products[0]);
  });

  it("should return null when try to get an inexistent product", async () => {
    const product = await sut.repository.findById("1000");
    expect(product).toBeNull();
  });

  it("should get all products [ without pagination and filters ]", async () => {
    const products = await sut.repository.findAll();
    expect(products).toMatchObject(sut.repository.products);
  });

  it("should get all products [ with filters | without pagination ]", async () => {
    const products = await sut.repository.findAll({
      filters: {
        categoryId: "1",
      },
    });
    expect(products).toMatchObject(
      sut.repository.products.filter((product) => product.categoryId === "1")
    );
  });

  it("should get all products [ without filters | with pagination ]", async () => {
    const products = await sut.repository.findAll({
      pagination: {
        offset: 8,
        limit: 2,
      },
    });

    expect(products).toMatchObject([
      sut.repository.products[8],
      sut.repository.products[9],
    ]);
  });

  it("should get all products [ with pagination and filters ]", async () => {
    const products = await sut.repository.findAll({
      filters: {
        categoryId: "1",
      },
      pagination: {
        offset: 100,
        limit: 10,
      },
    });

    expect(products).toMatchObject([]);
  });
});
