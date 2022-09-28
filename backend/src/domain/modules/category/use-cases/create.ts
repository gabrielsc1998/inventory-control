import { InvalidParamError } from "@/domain/errors";

export interface CreateCategory {
  execute(input: CreateCategory.Input): Promise<CreateCategory.Output>;
}

export namespace CreateCategory {
  export type Input = {
    name: string;
  };

  type OutputError = InvalidParamError;
  export type Output =
    | {
        id: string;
        name: string;
      }
    | OutputError;
}
