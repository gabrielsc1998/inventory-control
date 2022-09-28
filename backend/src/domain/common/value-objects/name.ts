import { InvalidParamError } from "@/domain/errors";

import { ValueObject } from "./base";

export class Name extends ValueObject<InvalidParamError> {
  private readonly name: string;

  private constructor({ name, error }: Name.Props) {
    super();
    if (error) {
      this.error = new InvalidParamError(`name - ${name}`);
    } else {
      this.name = name;
    }
    Object.freeze(this);
  }

  static create(name: string): Name.Output {
    const invalidName = typeof name !== "string" || name.length === 0;
    return new Name({ name, error: invalidName });
  }

  get value(): string {
    return this.name;
  }
}

export namespace Name {
  export type Props = {
    name: string;
    error?: boolean;
  };

  export type Output = Name;
}
