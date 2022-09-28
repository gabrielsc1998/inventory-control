import { InvalidParamError } from "@/domain/errors";

import { ValueObject } from "./base";

export class ID extends ValueObject<InvalidParamError> {
  private readonly id: string;

  private constructor({ id, error }: ID.Props) {
    super();
    if (error) {
      this.error = new InvalidParamError(`id - ${id}`);
    } else {
      this.id = id;
    }
    Object.freeze(this);
  }

  static create(id: string): ID.Output {
    const invalidID = typeof id !== "string" || id.length === 0;
    return new ID({ id, error: invalidID });
  }

  get value(): string {
    return this.id;
  }
}

export namespace ID {
  export type Props = {
    id: string;
    error?: boolean;
  };

  export type Output = ID;
}
