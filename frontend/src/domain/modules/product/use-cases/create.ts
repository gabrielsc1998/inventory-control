import { STATUS_TYPES } from "common/constants";

export interface CreateProduct {
  execute(input: CreateProduct.Input): Promise<CreateProduct.Output>;
}

export namespace CreateProduct {
  export type Input = {
    name: string;
    categoryId: string;
  };

  export type Output = {
    status: STATUS_TYPES;
    data?: { id: string };
    error?: Error;
  };
}
