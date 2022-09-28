import { InvalidParamError } from "@/domain/errors";

import { Category } from "..";

type SUT = {
  category: typeof Category;
};

const makeSut = (): SUT => {
  return {
    category: Category,
  };
};

let sut: SUT = null;

describe("Category [ Entity ]", () => {
  beforeAll(() => (sut = makeSut()));

  it("should create a category with success", () => {
    const input: Category.Input = {
      id: "id",
      name: "name",
    };

    const output = sut.category.create(input);
    const hasError = output instanceof InvalidParamError;

    expect(hasError).toBeFalsy();
    expect(output).toBeInstanceOf(Category);

    if (!hasError) {
      expect(output).toMatchObject(input);
    }

    expect.assertions(3);
  });

  it("should return an error when is an invalid ID", () => {
    const input: Category.Input = {
      id: null,
      name: "name",
    };

    const output = sut.category.create(input);
    expect(output).toBeInstanceOf(InvalidParamError);
    expect(output).toMatchObject(new InvalidParamError(`id - ${input.id}`));
  });

  it("should return an error when is an invalid name", () => {
    const input: Category.Input = {
      id: "id",
      name: null,
    };

    const output = sut.category.create(input);
    expect(output).toBeInstanceOf(InvalidParamError);
    expect(output).toMatchObject(new InvalidParamError(`name - ${input.name}`));
  });
});
