import { InvalidParamError } from "@/domain/errors";
import { ID, Name } from "@/domain/common/value-objects";

export class Product {
  private readonly _id: ID;
  private readonly _name: Name;
  private _quantity: number;
  private readonly _categoryId: ID;

  constructor(props: Product.Props) {
    this._id = props.id;
    this._name = props.name;
    this._quantity = props.quantity;
    this._categoryId = props.categoryId;
  }

  static create(input: Product.Input): Product.Output {
    const id = ID.create(input.id);
    if (id.invalid) {
      return id.getError();
    }

    const name = Name.create(input.name);
    if (name.invalid) {
      return name.getError();
    }

    const categoryId = ID.create(input.categoryId);
    if (categoryId.invalid) {
      return new InvalidParamError(`categoryId - ${input.categoryId}`);
    }

    return new Product({
      id,
      name,
      quantity: input.quantity || 0,
      categoryId,
    });
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get quantity(): number {
    return this._quantity;
  }

  get categoryId(): string {
    return this._categoryId.value;
  }

  add(quantity: number) {
    this._quantity += quantity;
  }

  remove(quantity: number): void | Error {
    if (quantity > this._quantity) {
      return new Error("Unavailable quantity");
    }
    this._quantity -= quantity;
  }
}

export namespace Product {
  export type Props = {
    id: ID;
    name: Name;
    quantity: number;
    categoryId: ID;
  };

  export type Input = {
    id: string;
    name: string;
    categoryId: string;
    quantity?: number;
  };

  type OutputError = InvalidParamError;

  export type Output = Product | OutputError;
}
