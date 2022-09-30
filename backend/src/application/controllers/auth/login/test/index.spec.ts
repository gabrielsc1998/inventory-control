import {
  tokenHandlerMock,
  TokenHandlerMock,
} from "@/common/tests/mocks/infra/gateways/token-handler";
import { CREDENTIALS } from "@/common/credentials";
import { TokenHandler } from "@/domain/contracts/gateways";
import { Controller } from "@/application/contracts/controllers";
import { badRequest, ok, unauthorized } from "@/application/helpers";
import { UserLoginUseCase } from "@/application/modules/user/use-cases/login";

import { LoginController } from "..";

type SUT = {
  loginController: Controller;
  tokenHandler: TokenHandler;
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerMock();
  const loginUseCase = new UserLoginUseCase(tokenHandler);
  const loginController = new LoginController(loginUseCase);

  return {
    loginController,
    tokenHandler,
  };
};

let sut: SUT = null;

describe("Login [ Controller ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should return success to valid credentials", async () => {
    const input = {
      body: {
        email: CREDENTIALS.EMAIL,
        password: CREDENTIALS.PASSWORD,
      },
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");
    const output = await sut.loginController.handle(input);

    expect(output).toMatchObject(
      ok({
        token: tokenHandlerMock.generatedToken,
        refreshToken: tokenHandlerMock.generatedToken,
      })
    );
    expect(spyTokenGenerate).toBeCalledTimes(2);
  });

  it("should return error when the credentials are invalid", async () => {
    const input = {
      body: {
        email: "invalid-email",
        password: "invalid-password",
      },
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");
    const output = await sut.loginController.handle(input);

    expect(output).toMatchObject(unauthorized());
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });

  it("should return error when the input is null", async () => {
    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.loginController.handle(null);

    expect(output).toMatchObject(badRequest(new Error(`email not provided`)));
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });

  it("should return error when the email is not provided", async () => {
    const input = {
      body: {
        password: CREDENTIALS.PASSWORD,
      },
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.loginController.handle(input);

    expect(output).toMatchObject(badRequest(new Error(`email not provided`)));
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });

  it("should return error when the password is not provided", async () => {
    const input = {
      body: {
        email: CREDENTIALS.EMAIL,
      },
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.loginController.handle(input);

    expect(output).toMatchObject(
      badRequest(new Error(`password not provided`))
    );
    expect(spyTokenGenerate).toBeCalledTimes(0);
  });
});
