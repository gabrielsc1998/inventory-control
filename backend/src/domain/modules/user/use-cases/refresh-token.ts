import { InvalidTokenError } from "@/domain/errors";

export interface UserRefreshToken {
  execute(input: UserRefreshToken.Input): Promise<UserRefreshToken.Output>;
}

export namespace UserRefreshToken {
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
