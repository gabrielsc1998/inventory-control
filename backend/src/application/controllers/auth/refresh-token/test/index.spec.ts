import {
  tokenHandlerMock,
  TokenHandlerMock,
} from "@/common/tests/mocks/infra/gateways/token-handler";
import { TokenHandler } from "@/domain/contracts/gateways";
import { Controller } from "@/application/contracts/controllers";
import { badRequest, ok, unauthorized } from "@/application/helpers";
import { UserRefreshTokenUseCase } from "@/application/modules/user/use-cases";

import { RefreshTokenController } from "..";

type SUT = {
  refreshTokenController: Controller;
  tokenHandler: TokenHandler;
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerMock();
  const refreshTokenUseCase = new UserRefreshTokenUseCase(tokenHandler);
  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase
  );

  return {
    refreshTokenController,
    tokenHandler,
  };
};

let sut: SUT = null;

describe("Refresh Token [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should return a new tokens", async () => {
    const token = "refresh-token";
    const input = {
      body: {
        access_token: token,
      },
    };

    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.refreshTokenController.handle(input);

    expect(output).toMatchObject(
      ok({
        token: tokenHandlerMock.generatedToken,
        refreshToken: tokenHandlerMock.generatedToken,
      })
    );
    expect(spyTokenValidate).toBeCalledWith({ token });
    expect(spyTokenGenerate).toBeCalledTimes(2);
  });

  it("should return error when the input is null", async () => {
    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.refreshTokenController.handle(null);

    expect(output).toMatchObject(
      badRequest(new Error(`access_token not provided`))
    );
    expect(spyTokenValidate).toBeCalledTimes(0);
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });

  it("should return error when the token is invalid", async () => {
    const token = "invalid-refresh-token";
    const input = {
      body: {
        access_token: token,
      },
    };

    const spyTokenValidate = jest
      .spyOn(sut.tokenHandler, "validate")
      .mockReturnValue(false);
    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.refreshTokenController.handle(input);

    expect(output).toMatchObject(unauthorized());
    expect(spyTokenValidate).toBeCalledWith({ token });
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });
});
