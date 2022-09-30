import { InvalidTokenError } from "@/domain/errors";
import { TokenHandler } from "@/domain/contracts/gateways";
import { AuthRefreshToken } from "@/domain/modules/auth/use-cases";

export class AuthRefreshTokenUseCase implements AuthRefreshToken {
  constructor(private readonly tokenHandler: TokenHandler) {}

  async execute(
    input: AuthRefreshToken.Input
  ): Promise<AuthRefreshToken.Output> {
    if (!input) {
      return new InvalidTokenError();
    }

    const refreshTokenIsValid = this.tokenHandler.validate({
      token: input.refreshToken,
    });

    if (refreshTokenIsValid) {
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

    return new InvalidTokenError();
  }
}
