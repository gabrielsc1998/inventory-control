import { InvalidParamError } from "@/domain/errors";

import { Product } from "..";

type SUT = {
  category: typeof Product;
};

const makeSut = (): SUT => {
  return {
    category: Product,
  };
};

let sut: SUT = null;

describe("Product [ Entity ]", () => {
  beforeAll(() => (sut = makeSut()));

  it("should create a category with success", () => {
    const input: Product.Input = {
      id: "id",
      name: "name",
      categoryId: "category-id",
    };

    const output = sut.category.create(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toBeInstanceOf(Product);

    if (!hasError) {
      expect(output).toMatchObject(input);
      expect(output.quantity).toBe(0);
    }

    expect.assertions(4);
  });

  it("should create a category with success [ with quantity ]", () => {
    const input: Product.Input = {
      id: "id",
      name: "name",
      categoryId: "category-id",
      quantity: 10,
    };

    const output = sut.category.create(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toBeInstanceOf(Product);

    if (!hasError) {
      expect(output).toMatchObject(input);
      expect(output.quantity).toBe(10);
    }

    expect.assertions(4);
  });

  it("should add a quantity", () => {
    const input: Product.Input = {
      id: "id",
      name: "name",
      categoryId: "category-id",
      quantity: 10,
    };

    const output = sut.category.create(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toBeInstanceOf(Product);

    if (!hasError) {
      expect(output).toMatchObject(input);
      expect(output.quantity).toBe(input.quantity);
      output.add(input.quantity);
      expect(output.quantity).toBe(input.quantity * 2);
    }

    expect.assertions(5);
  });

  it("should remove a quantity", () => {
    const input: Product.Input = {
      id: "id",
      name: "name",
      categoryId: "category-id",
      quantity: 10,
    };

    const output = sut.category.create(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toBeInstanceOf(Product);

    if (!hasError) {
      expect(output).toMatchObject(input);
      expect(output.quantity).toBe(input.quantity);
      output.remove(input.quantity * 2);
      expect(output.quantity).toBe(0);
    }

    expect.assertions(5);
  });

  it("should return an error when is an invalid ID", () => {
    const input: Product.Input = {
      id: null,
      name: "name",
      categoryId: "category-id",
    };

    const output = sut.category.create(input);
    expect(output).toBeInstanceOf(InvalidParamError);
    expect(output).toMatchObject(new InvalidParamError(`id - ${input.id}`));
  });

  it("should return an error when is an invalid category id", () => {
    const input: Product.Input = {
      id: "id",
      name: "name",
      categoryId: null,
    };

    const output = sut.category.create(input);
    expect(output).toBeInstanceOf(InvalidParamError);
    expect(output).toMatchObject(
      new InvalidParamError(`categoryId - ${input.categoryId}`)
    );
  });

  it("should return an error when is an invalid name", () => {
    const input: Product.Input = {
      id: "id",
      name: null,
      categoryId: "category-id",
    };

    const output = sut.category.create(input);
    expect(output).toBeInstanceOf(InvalidParamError);
    expect(output).toMatchObject(new InvalidParamError(`name - ${input.name}`));
  });
});
