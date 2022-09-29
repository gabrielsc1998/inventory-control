import { InvalidCredentialsError } from "@/domain/errors";

import { User } from "../types";

export interface UserLogin {
  execute(input: UserLogin.Input): Promise<UserLogin.Output>;
}

export namespace UserLogin {
  export type Input = User;

  export type Output =
    | {
        token: string;
        refreshToken: string;
      }
    | InvalidCredentialsError;
}
