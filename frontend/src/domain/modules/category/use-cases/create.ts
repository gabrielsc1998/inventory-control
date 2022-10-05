import { STATUS_TYPES } from "common/constants";

export interface CreateCategory {
  execute(input: CreateCategory.Input): Promise<CreateCategory.Output>;
}

export namespace CreateCategory {
  export type Input = {
    name: string;
  };

  export type Output = {
    status: STATUS_TYPES;
    data?: { id: string };
    error?: Error;
  };
}
