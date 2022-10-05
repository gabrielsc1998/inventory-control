import { STATUS_TYPES } from "common/constants";

export interface RemoveProducts {
  execute(input: RemoveProducts.Input): Promise<RemoveProducts.Output>;
}

export namespace RemoveProducts {
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
