export interface TokenHandler {
  generate(input: TokenHandler.GenerateInput): TokenHandler.GenerateOutput;
  validate(input: TokenHandler.ValidateInput): TokenHandler.ValidateOutput;
}

export namespace TokenHandler {
  export type GenerateInput = {
    key: string;
    expirationInSec: number;
  };

  export type GenerateOutput = string;

  export type ValidateInput = {
    token: string;
  };

  export type ValidateOutput = boolean;
}
