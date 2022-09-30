import { InvalidCredentialsError } from "@/domain/errors";

export interface AuthLogin {
  execute(input: AuthLogin.Input): Promise<AuthLogin.Output>;
}

export namespace AuthLogin {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output =
    | {
        token: string;
        refreshToken: string;
      }
    | InvalidCredentialsError;
}
