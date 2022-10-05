import { LOCAL_STORAGE } from "common/keys";

import { Logout } from "domain/modules/auth/use-cases";
import { LocalStorage } from "domain/contracts/gateways";
import { LocalStorageMock } from "common/test/mocks/infra/gateways/local-storage";

import { LogoutUseCase } from "..";

type SUT = {
  logoutUseCase: Logout;
  localStorage: LocalStorage;
};

const makeSut = (): SUT => {
  const localStorage = new LocalStorageMock();
  const logoutUseCase = new LogoutUseCase(localStorage);

  return {
    logoutUseCase,
    localStorage,
  };
};

let sut: SUT = null;

describe("Logout [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should make the logout successfully", async () => {
    const spyLocalStorageRemove = jest.spyOn(sut.localStorage, "remove");

    const output = await sut.logoutUseCase.execute();

    expect(spyLocalStorageRemove).toBeCalledWith({
      key: LOCAL_STORAGE.TOKEN,
    });
    expect(spyLocalStorageRemove).toBeCalledWith({
      key: LOCAL_STORAGE.REFRESH_TOKEN,
    });
  });
});
