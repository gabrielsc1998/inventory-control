import { TokenHandler } from "@/domain/contracts/gateways";

import { JwtPayload, sign, verify } from "jsonwebtoken";

export class TokenHandlerJWTAdapter implements TokenHandler {
  constructor(private readonly secret: string) {}

  generate(input: TokenHandler.GenerateInput): string {
    return sign({ key: input.key }, this.secret, {
      expiresIn: input.expirationInSec,
    });
  }

  validate(input: TokenHandler.ValidateInput): boolean {
    let validToken = false;

    verify(input.token, this.secret, (error) => {
      validToken = error ? false : true;
    });

    return validToken;
  }
}
