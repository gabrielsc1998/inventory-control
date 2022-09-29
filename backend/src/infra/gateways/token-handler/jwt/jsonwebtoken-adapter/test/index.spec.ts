import jsonwebtoken from "jsonwebtoken";

import { TokenHandler } from "@/domain/contracts/gateways";

import { TokenHandlerJWTAdapter } from "..";

type SUT = {
  tokenHandler: TokenHandler;
};

const mocks = {
  secret: "123456123456",
  generatedToken: "generated-token",
};

const makeSut = (): SUT => {
  const tokenHandler = new TokenHandlerJWTAdapter(mocks.secret);

  return {
    tokenHandler,
  };
};

let sut: SUT = null;

describe("Token - JWT [ Gateway ]", () => {
  beforeAll(() => (sut = makeSut()));

  it("should generate a token", () => {
    const input: TokenHandler.GenerateInput = {
      key: "key",
      expirationInSec: 1000,
    };

    const spySign = jest
      .spyOn(jsonwebtoken, "sign")
      .mockImplementation(() => mocks.generatedToken);

    const output = sut.tokenHandler.generate(input);

    expect(output).toEqual(mocks.generatedToken);
    expect(spySign).toBeCalledWith({ key: input.key }, mocks.secret, {
      expiresIn: input.expirationInSec,
    });
  });

  it("should return true when token is valid", () => {
    const input: TokenHandler.ValidateInput = { token: "valid-token" };
    const spyVerify = jest
      .spyOn(jsonwebtoken, "verify")
      .mockImplementation((token, secret, cb: any) => {
        const error = false;
        cb(error);
      });

    const output = sut.tokenHandler.validate(input);

    expect(output).toBeTruthy();
    expect(spyVerify).toBeCalledWith(
      input.token,
      mocks.secret,
      expect.any(Function)
    );
  });

  it("should return true when token is invalid", () => {
    const input: TokenHandler.ValidateInput = { token: "valid-token" };
    const spyVerify = jest
      .spyOn(jsonwebtoken, "verify")
      .mockImplementation((token, secret, cb: any) => {
        const error = true;
        cb(error);
      });

    const output = sut.tokenHandler.validate(input);

    expect(output).toBeFalsy();
    expect(spyVerify).toBeCalledWith(
      input.token,
      mocks.secret,
      expect.any(Function)
    );
  });
});
