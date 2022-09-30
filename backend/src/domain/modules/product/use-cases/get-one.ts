import { InvalidParamError, NotFoundError } from "@/domain/errors";

export interface GetOneProduct {
  execute(input: GetOneProduct.Input): Promise<GetOneProduct.Output>;
}

export namespace GetOneProduct {
  export type Input = {
    id: string;
  };

  type OutputError = InvalidParamError | NotFoundError;
  export type Output =
    | {
        id: string;
        name: string;
        quantity: number;
        categoryId: string;
        categoryName: string;
      }
    | OutputError;
}
