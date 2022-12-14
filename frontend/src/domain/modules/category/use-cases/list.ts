import { STATUS_TYPES } from "common/constants";

import { CategoryModel } from "../model";

export interface ListCategories {
  execute(input?: ListCategories.Input): Promise<ListCategories.Output>;
}

export namespace ListCategories {
  export type Input = {
    noCache?: boolean;
  };

  export type Output = {
    status: STATUS_TYPES;
    data?: Array<CategoryModel>;
    error?: Error;
  };
}
