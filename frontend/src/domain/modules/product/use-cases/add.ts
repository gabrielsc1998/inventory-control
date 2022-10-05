import { STATUS_TYPES } from "common/constants";

export interface AddProducts {
  execute(input: AddProducts.Input): Promise<AddProducts.Output>;
}

export namespace AddProducts {
  export type Input = {
    productId: string;
    quantity: number;
  };

  export type Output = {
    status: STATUS_TYPES;
    data?: { id: string };
    error?: Error;
  };
}
