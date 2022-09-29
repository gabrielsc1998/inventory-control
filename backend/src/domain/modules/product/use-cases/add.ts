import { InvalidParamError } from "@/domain/errors";

export interface AddProduct {
  execute(input: AddProduct.Input): Promise<AddProduct.Output>;
}

export namespace AddProduct {
  export type Input = {
    id: string;
    quantity: number;
  };

  type OutputError = InvalidParamError;
  export type Output =
    | {
        id: string;
        quantity: number;
      }
    | OutputError;
}
