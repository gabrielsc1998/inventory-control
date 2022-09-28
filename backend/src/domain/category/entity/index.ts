import { InvalidParamError } from "@/domain/errors";
import { ID, Name } from "@/domain/common/value-objects";

export class Category {
  private readonly _id: ID;
  private readonly _name: Name;

  constructor(props: Category.Props) {
    this._id = props.id;
    this._name = props.name;
  }

  static create(input: Category.Input): Category.Output {
    const id = ID.create(input.id);
    if (id.invalid) {
      return id.getError();
    }

    const name = Name.create(input.name);
    if (name.invalid) {
      return name.getError();
    }

    return new Category({
      id,
      name,
    });
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }
}

export namespace Category {
  export type Props = {
    id: ID;
    name: Name;
  };

  export type Input = {
    id: string;
    name: string;
  };

  type OutputError = InvalidParamError;

  export type Output = Category | OutputError;
}
