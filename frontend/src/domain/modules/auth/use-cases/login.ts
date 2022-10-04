import { STATUS_TYPES } from "common/constants";

export interface Login {
  execute(input: Login.Input): Promise<Login.Output>;
}

export namespace Login {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = { status: STATUS_TYPES; error?: Error };
}
