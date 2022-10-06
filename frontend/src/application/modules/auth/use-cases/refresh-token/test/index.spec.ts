import { ROUTES } from "common/routes";
import { STORAGE } from "common/keys";
import { error, success } from "domain/helpers/status";
import { DomainStorage } from "domain/contracts/gateways";
import { RefreshToken } from "domain/modules/auth/use-cases";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";
import { DomainStorageMock } from "common/test/mocks/infra/gateways/domain-storage";

import { RefreshTokenUseCase } from "..";

type SUT = {
  loginUseCase: RefreshToken;
  serviceAPI: ServiceAPI;
  domainStorage: DomainStorage;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const domainStorage = new DomainStorageMock();
  const loginUseCase = new RefreshTokenUseCase(serviceAPI, domainStorage);

  return {
    loginUseCase,
    serviceAPI,
    domainStorage,
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

    const spyDomainStorageGet = jest
      .spyOn(sut.domainStorage, "get")
      .mockReturnValue(mockRefreshToken);
    const spyDomainStorageSet = jest.spyOn(sut.domainStorage, "set");

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(success());
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.REFRESH_TOKEN,
      body: { access_token: mockRefreshToken },
    });
    expect(spyDomainStorageGet).toBeCalledWith({
      key: STORAGE.REFRESH_TOKEN,
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

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const spyDomainStorageGet = jest
      .spyOn(sut.domainStorage, "get")
      .mockReturnValue(mockRefreshToken);

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyDomainStorageGet).toBeCalledWith({
      key: STORAGE.REFRESH_TOKEN,
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

    const spyDomainStorageGet = jest
      .spyOn(sut.domainStorage, "get")
      .mockReturnValue(mockRefreshToken);

    const output = await sut.loginUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyDomainStorageGet).toBeCalledWith({
      key: STORAGE.REFRESH_TOKEN,
    });
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.REFRESH_TOKEN,
      body: { access_token: mockRefreshToken },
    });
  });
});
