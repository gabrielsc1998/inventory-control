import { CREDENTIALS } from "@/common/credentials";
import { InvalidCredentialsError } from "@/domain/errors";
import { TokenHandler } from "@/domain/contracts/gateways";
import { AuthLogin } from "@/domain/modules/auth/use-cases";

export class AuthLoginUseCase implements AuthLogin {
  constructor(private readonly tokenHandler: TokenHandler) {}

  async execute(input: AuthLogin.Input): Promise<AuthLogin.Output> {
    if (!input) {
      return new InvalidCredentialsError();
    }

    const correctCredentials =
      input.email === CREDENTIALS.EMAIL &&
      input.password === CREDENTIALS.PASSWORD;

    if (correctCredentials) {
      const tokenKey = JSON.stringify({ userId: "1" });
      const minToSec = (min: number): number => min * 60;
      return {
        token: this.tokenHandler.generate({
          key: tokenKey,
          expirationInSec: minToSec(5),
        }),
        refreshToken: this.tokenHandler.generate({
          key: tokenKey,
          expirationInSec: minToSec(30),
        }),
      };
    }

    return new InvalidCredentialsError();
  }
}
