import { TokenHandler } from "@/domain/contracts/gateways";

export const tokenHandlerMock = {
  defaultValidateRet: true,
  generatedToken: "generated-token",
};

export class TokenHandlerMock implements TokenHandler {
  generate(input: TokenHandler.GenerateInput): string {
    return tokenHandlerMock.generatedToken;
  }

  validate(input: TokenHandler.ValidateInput): boolean {
    return tokenHandlerMock.defaultValidateRet;
  }
}
