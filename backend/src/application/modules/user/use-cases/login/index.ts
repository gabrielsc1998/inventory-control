import { CREDENTIALS } from "@/common/credentials";
import { InvalidCredentialsError } from "@/domain/errors";
import { TokenHandler } from "@/domain/contracts/gateways";
import { UserLogin } from "@/domain/modules/user/use-cases";

export class UserLoginUseCase implements UserLogin {
  constructor(private readonly tokenHandler: TokenHandler) {}

  async execute(input: UserLogin.Input): Promise<UserLogin.Output> {
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
