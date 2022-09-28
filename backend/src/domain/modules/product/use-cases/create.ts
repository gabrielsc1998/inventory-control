import { InvalidParamError } from "@/domain/errors";

export interface CreateProduct {
  execute(input: CreateProduct.Input): Promise<CreateProduct.Output>;
}

export namespace CreateProduct {
  export type Input = {
    name: string;
    categoryId: string;
  };

  type OutputError = InvalidParamError;
  export type Output =
    | {
        id: string;
      }
    | OutputError;
}
