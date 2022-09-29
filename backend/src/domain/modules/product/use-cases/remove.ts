import { InvalidParamError } from "@/domain/errors";

export interface RemoveProduct {
  execute(input: RemoveProduct.Input): Promise<RemoveProduct.Output>;
}

export namespace RemoveProduct {
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
