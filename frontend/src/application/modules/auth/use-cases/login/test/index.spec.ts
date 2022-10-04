import { ROUTES } from "common/routes";
import { LOCAL_STORAGE } from "common/keys";
import { Login } from "domain/modules/auth/use-cases";
import { LocalStorage } from "domain/contracts/gateways";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";
import { LocalStorageMock } from "common/test/mocks/infra/gateways/local-storage";

import { LoginUseCase } from "..";

type SUT = {
  loginUseCase: Login;
  serviceAPI: ServiceAPI;
  localStorage: LocalStorage;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const localStorage = new LocalStorageMock();
  const loginUseCase = new LoginUseCase(serviceAPI, localStorage);

  return {
    loginUseCase,
    serviceAPI,
    localStorage,
  };
};

let sut: SUT = null;

describe("Login [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should make the login successfully", async () => {
    const mockOutput = {
      status: 200,
      data: {
        token: "token",
        refreshToken: "refresh-token",
      },
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const spyLocalStorageSet = jest.spyOn(sut.localStorage, "set");

    const input: Login.Input = {
      email: "email",
      password: "password",
    };
    const output = await sut.loginUseCase.execute(input);

    expect(output).toMatchObject({ status: "success" });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
    expect(spyLocalStorageSet).toBeCalledWith({
      key: LOCAL_STORAGE.TOKEN,
      value: mockOutput.data.token,
    });
    expect(spyLocalStorageSet).toBeCalledWith({
      key: LOCAL_STORAGE.REFRESH_TOKEN,
      value: mockOutput.data.refreshToken,
    });
  });

  it("should get an error when the input is invalid", async () => {
    const mockOutput = {
      status: 400,
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input: Login.Input = null;
    const output = await sut.loginUseCase.execute(input);

    expect(output).toMatchObject({
      status: "error",
      error: new Error("Invalid credentials"),
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const input: Login.Input = null;
    const output = await sut.loginUseCase.execute(input);

    expect(output).toMatchObject({
      status: "error",
      error: new Error("some error"),
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const input: Login.Input = null;
    const output = await sut.loginUseCase.execute(input);

    expect(output).toMatchObject({
      status: "error",
      error: new Error("some error"),
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
  });
});
