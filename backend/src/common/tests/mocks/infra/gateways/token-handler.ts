import { TokenHandler } from "@/domain/contracts/gateways";

export const tokenHandlerMock = {
  generatedToken: "generated-token",
};

export class TokenHandlerMock implements TokenHandler {
  generate(input: TokenHandler.GenerateInput): string {
    return tokenHandlerMock.generatedToken;
  }

  validate(input: TokenHandler.ValidateInput): boolean {
    throw new Error("Method not implemented.");
  }
}
