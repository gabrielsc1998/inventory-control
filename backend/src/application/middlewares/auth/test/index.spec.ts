import { TokenHandler } from "@/domain/contracts/gateways";
import { Middleware } from "@/application/contracts/middlewares";
import { badRequest, unauthorized } from "@/application/helpers";
import { TokenHandlerMock } from "@/common/tests/mocks/infra/gateways/token-handler";

import { AuthMiddleware } from "..";

type SUT = {
  authMiddleware: Middleware;
  tokenHandler: TokenHandler;
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerMock();
  const authMiddleware = new AuthMiddleware(tokenHandler);

  return {
    authMiddleware,
    tokenHandler,
  };
};

let sut: SUT = null;

describe("Auth [ Middleware ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should return void when the auth is ok", async () => {
    const token = "valid-jwt-token";
    const input = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const output = await sut.authMiddleware.handle(input);

    expect(output).toBeUndefined();
    expect(spyTokenValidate).toBeCalledWith({ token });
  });

  it("should return error when input is null", async () => {
    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const output = await sut.authMiddleware.handle(null);

    expect(output).toMatchObject(badRequest(new Error("No token provided")));
    expect(spyTokenValidate).not.toBeCalled();
  });

  it("should return error when the token is badly formatted [no token]", async () => {
    const input = {
      headers: {
        authorization: `Bearer`,
      },
    };

    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const output = await sut.authMiddleware.handle(input);

    expect(output).toMatchObject(
      badRequest(new Error("Badly formatted token"))
    );
    expect(spyTokenValidate).not.toBeCalled();
  });

  it("should return error when the token is badly formatted [no Bearer]", async () => {
    const input = {
      headers: {
        authorization: `X token`,
      },
    };

    const spyTokenValidate = jest.spyOn(sut.tokenHandler, "validate");
    const output = await sut.authMiddleware.handle(input);

    expect(output).toMatchObject(
      badRequest(new Error("Badly formatted token"))
    );
    expect(spyTokenValidate).not.toBeCalled();
  });

  it("should return error when the token is invalid", async () => {
    const token = "valid-jwt-token";
    const input = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const spyTokenValidate = jest
      .spyOn(sut.tokenHandler, "validate")
      .mockReturnValue(false);

    const output = await sut.authMiddleware.handle(input);

    expect(output).toMatchObject(unauthorized());
    expect(spyTokenValidate).toBeCalledWith({ token });
  });
});
