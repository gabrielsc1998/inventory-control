import { InvalidTokenError } from "@/domain/errors";

export interface AuthRefreshToken {
  execute(input: AuthRefreshToken.Input): Promise<AuthRefreshToken.Output>;
}

export namespace AuthRefreshToken {
  export type Input = {
    refreshToken: string;
  };

  export type Output =
    | {
        token: string;
        refreshToken: string;
      }
    | InvalidTokenError;
}
