import { ROUTES } from "common/routes";
import { STORAGE } from "common/keys";
import { Login } from "domain/modules/auth/use-cases";
import { error, success } from "domain/helpers/status";
import { DomainStorage } from "domain/contracts/gateways";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";
import { DomainStorageMock } from "common/test/mocks/infra/gateways/domain-storage";

import { LoginUseCase } from "..";

type SUT = {
  loginUseCase: Login;
  serviceAPI: ServiceAPI;
  domainStorage: DomainStorage;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const domainStorage = new DomainStorageMock();
  const loginUseCase = new LoginUseCase(serviceAPI, domainStorage);

  return {
    loginUseCase,
    serviceAPI,
    domainStorage,
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

    const spyDomainStorageSet = jest.spyOn(sut.domainStorage, "set");

    const input: Login.Input = {
      email: "email",
      password: "password",
    };
    const output = await sut.loginUseCase.execute(input);

    expect(output).toMatchObject(success());
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
    expect(spyDomainStorageSet).toBeCalledWith({
      key: STORAGE.TOKEN,
      value: mockOutput.data.token,
    });
    expect(spyDomainStorageSet).toBeCalledWith({
      key: STORAGE.REFRESH_TOKEN,
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

    expect(output).toMatchObject(error(new Error("Invalid credentials")));
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

    expect(output).toMatchObject(error(new Error("some error")));
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

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.LOGIN,
      body: input,
    });
  });
});
