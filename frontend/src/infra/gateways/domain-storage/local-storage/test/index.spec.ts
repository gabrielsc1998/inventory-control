import { DomainStorage } from "domain/contracts/gateways";

import { LocalStorageGateway } from "..";

type SUT = {
  localStorage: DomainStorage;
};

const makeSut = (): SUT => {
  const localStorage = new LocalStorageGateway();

  return {
    localStorage,
  };
};

let sut: SUT = null;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.window = jest.fn() as any;
global.localStorage = localStorageMock as any;

describe("Auth [ Middleware ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  describe("When call the 'set' method", () => {
    it("should add a value successfully", () => {
      const data = {
        key: null,
        value: null,
      };

      const input = {
        key: "key",
        value: "value",
      };

      const spySetItem = jest
        .spyOn(localStorage, "setItem")
        .mockImplementation((key, value) => {
          data.key = key;
          data.value = value;
        });

      sut.localStorage.set(input);

      expect(data).toMatchObject(input);
      expect(spySetItem).toBeCalledWith(input.key, input.value);
    });

    it("should return error when some wrong happen", () => {
      const input = {
        key: "key",
        value: "value",
      };

      const spySetItem = jest
        .spyOn(localStorage, "setItem")
        .mockImplementation((key, value) => {
          throw new Error("some error");
        });

      const output = sut.localStorage.set(input);

      expect(output).toMatchObject(new Error("some error"));
      expect(spySetItem).toBeCalledWith(input.key, input.value);
    });
  });

  describe("When call the 'get' method", () => {
    it("should get a value successfully", () => {
      const mockRetData = "value";
      const data = { key: null };
      const input = { key: "key" };
      const spyGetItem = jest
        .spyOn(localStorage, "getItem")
        .mockImplementation((key): string => {
          data.key = key;
          return mockRetData;
        });

      const output = sut.localStorage.get(input);

      expect(data).toMatchObject(input);
      expect(output).toEqual(mockRetData);
      expect(spyGetItem).toBeCalledWith(input.key);
    });

    it("should return null when the key not exists", () => {
      const input = { key: "key" };
      const spyGetItem = jest
        .spyOn(localStorage, "getItem")
        .mockImplementation((key): string => null);

      const output = sut.localStorage.get(input);

      expect(output).toEqual(null);
      expect(spyGetItem).toBeCalledWith(input.key);
    });
  });

  describe("When call the 'remove' method", () => {
    it("should remove a value successfully", () => {
      const data = { key: null };
      const input = { key: "key" };
      const spyRemoveItem = jest
        .spyOn(localStorage, "removeItem")
        .mockImplementation((key) => {
          data.key = key;
        });

      sut.localStorage.remove(input);

      expect(data).toMatchObject(input);
      expect(spyRemoveItem).toBeCalledWith(input.key);
    });
  });
});
