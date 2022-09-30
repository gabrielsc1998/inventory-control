import {
  tokenHandlerMock,
  TokenHandlerMock,
} from "@/common/tests/mocks/infra/gateways/token-handler";
import { InvalidTokenError } from "@/domain/errors";
import { TokenHandler } from "@/domain/contracts/gateways";
import { AuthRefreshToken } from "@/domain/modules/auth/use-cases";

import { AuthRefreshTokenUseCase } from "..";

type SUT = {
  tokenHandler: TokenHandler;
  refreshToken: AuthRefreshToken;
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerMock();
  const refreshToken = new AuthRefreshTokenUseCase(tokenHandler);

  return {
    tokenHandler,
    refreshToken,
  };
};

let sut: SUT = null;

describe("Login [ Use Case ]", () => {
  beforeAll(async () => (sut = makeSut()));

  beforeEach(() => jest.clearAllMocks());

  it("should refresh token successfully", async () => {
    const input: AuthRefreshToken.Input = {
      refreshToken: "valid-refresh-token",
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.refreshToken.execute(input);

    const hasError = output instanceof InvalidTokenError;

    expect(hasError).toBeFalsy();
    if (!hasError) {
      expect(output).toMatchObject({
        token: tokenHandlerMock.generatedToken,
        refreshToken: tokenHandlerMock.generatedToken,
      });
      expect(spyTokenGenerate).toHaveBeenCalledTimes(2);
    }

    expect.assertions(3);
  });

  it("should return invalid-token when the input is null", async () => {
    const input: AuthRefreshToken.Input = null;

    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.refreshToken.execute(input);

    const hasError = output instanceof InvalidTokenError;

    expect(hasError).toBeTruthy();
    expect(spyTokenValidate).toHaveBeenCalledTimes(0);
    expect(spyTokenGenerate).toHaveBeenCalledTimes(0);
    expect(output).toMatchObject(new InvalidTokenError());
  });

  it("should return invalid-token when the token is invalid", async () => {
    const input: AuthRefreshToken.Input = {
      refreshToken: "invalid-token",
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");
    const spyTokenValidate = jest
      .spyOn(sut.tokenHandler, "validate")
      .mockImplementation(() => false);

    const output = await sut.refreshToken.execute(input);

    const hasError = output instanceof InvalidTokenError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidTokenError());
    expect(spyTokenGenerate).toHaveBeenCalledTimes(0);
    expect(spyTokenValidate).toHaveBeenCalledWith({
      token: input.refreshToken,
    });
  });
});
