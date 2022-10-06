import { STORAGE } from "common/keys";
import { Logout } from "domain/modules/auth/use-cases";
import { DomainStorage } from "domain/contracts/gateways";
import { DomainStorageMock } from "common/test/mocks/infra/gateways/domain-storage";

import { LogoutUseCase } from "..";

type SUT = {
  logoutUseCase: Logout;
  domainStorage: DomainStorage;
};

const makeSut = (): SUT => {
  const domainStorage = new DomainStorageMock();
  const logoutUseCase = new LogoutUseCase(domainStorage);

  return {
    logoutUseCase,
    domainStorage,
  };
};

let sut: SUT = null;

describe("Logout [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should make the logout successfully", async () => {
    const spyDomainStorageRemove = jest.spyOn(sut.domainStorage, "remove");

    const output = await sut.logoutUseCase.execute();

    expect(spyDomainStorageRemove).toBeCalledWith({
      key: STORAGE.TOKEN,
    });
    expect(spyDomainStorageRemove).toBeCalledWith({
      key: STORAGE.REFRESH_TOKEN,
    });
  });
});
