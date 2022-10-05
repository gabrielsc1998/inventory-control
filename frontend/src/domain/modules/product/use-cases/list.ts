import { STATUS_TYPES } from "common/constants";

import { ProductModel } from "../model";

export interface ListProducts {
  execute(input?: ListProducts.Input): Promise<ListProducts.Output>;
}

export namespace ListProducts {
  export type Input = {
    filters?: {
      name?: string;
      categoryId?: string;
    };
    pagination?: {
      page?: number;
      size?: number;
    };
  };

  export type Output = {
    status: STATUS_TYPES;
    data?: Array<ProductModel>;
    error?: Error;
  };
}
