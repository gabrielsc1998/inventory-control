import { ROUTES } from "common/routes";
import { LOCAL_STORAGE } from "common/keys";
import { error, success } from "domain/helpers/status";
import { LocalStorage } from "domain/contracts/gateways";
import { RefreshToken } from "domain/modules/auth/use-cases";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";
import { LocalStorageMock } from "common/test/mocks/infra/gateways/local-storage";

import { RefreshTokenUseCase } from "..";

type SUT = {
  loginUseCase: RefreshToken;
  serviceAPI: ServiceAPI;
  localStorage: LocalStorage;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const localStorage = new LocalStorageMock();
  const loginUseCase = new RefreshTokenUseCase(serviceAPI, localStorage);

  return {
    loginUseCase,
    serviceAPI,
    localStorage,
  };
};

let sut: SUT = null;

const mockRefreshToken = "refresh-token";

describe("RefreshToken [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should make the refresh token successfully", async () => {
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

    const spyLocalStorageGet = jest
      .spyOn(sut.localStorage, "get")
      .mockReturnValue(mockRefreshToken);
    const spyLocalStorageSet = jest.spyOn(sut.localStorage, "set");

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(success());
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.REFRESH_TOKEN,
      body: { access_token: mockRefreshToken },
    });
    expect(spyLocalStorageGet).toBeCalledWith({
      key: LOCAL_STORAGE.REFRESH_TOKEN,
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

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const spyLocalStorageGet = jest
      .spyOn(sut.localStorage, "get")
      .mockReturnValue(mockRefreshToken);

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyLocalStorageGet).toBeCalledWith({
      key: LOCAL_STORAGE.REFRESH_TOKEN,
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.REFRESH_TOKEN,
      body: { access_token: mockRefreshToken },
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const spyLocalStorageGet = jest
      .spyOn(sut.localStorage, "get")
      .mockReturnValue(mockRefreshToken);

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyLocalStorageGet).toBeCalledWith({
      key: LOCAL_STORAGE.REFRESH_TOKEN,
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.REFRESH_TOKEN,
      body: { access_token: mockRefreshToken },
    });
  });
});
