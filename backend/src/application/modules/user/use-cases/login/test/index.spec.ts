import {
  tokenHandlerMock,
  TokenHandlerMock,
} from "@/common/tests/mocks/infra/gateways/token-handler";
import { CREDENTIALS } from "@/common/credentials";
import { InvalidCredentialsError } from "@/domain/errors";
import { TokenHandler } from "@/domain/contracts/gateways";
import { UserLogin } from "@/domain/modules/user/use-cases";

import { UserLoginUseCase } from "..";

type SUT = {
  tokenHandler: TokenHandler;
  login: UserLogin;
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerMock();
  const login = new UserLoginUseCase(tokenHandler);

  return {
    tokenHandler,
    login,
  };
};

let sut: SUT = null;

describe("Login [ Use Case ]", () => {
  beforeAll(async () => (sut = makeSut()));

  beforeEach(() => jest.clearAllMocks());

  it("should login successfully", async () => {
    const input: UserLogin.Input = {
      email: CREDENTIALS.EMAIL,
      password: CREDENTIALS.PASSWORD,
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.login.execute(input);

    const hasError = output instanceof InvalidCredentialsError;

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

  it("should return invalid-credential when the input is null", async () => {
    const input: UserLogin.Input = null;

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.login.execute(input);

    const hasError = output instanceof InvalidCredentialsError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidCredentialsError());
    expect(spyTokenGenerate).toHaveBeenCalledTimes(0);
  });

  it("should return invalid-credential when the credentials are invalid", async () => {
    const input: UserLogin.Input = {
      email: "invalid-email",
      password: "invalid-password",
    };

    const spyTokenGenerate = jest.spyOn(sut.tokenHandler, "generate");

    const output = await sut.login.execute(input);

    const hasError = output instanceof InvalidCredentialsError;

    expect(hasError).toBeTruthy();
    expect(output).toMatchObject(new InvalidCredentialsError());
    expect(spyTokenGenerate).toHaveBeenCalledTimes(0);
  });
});
