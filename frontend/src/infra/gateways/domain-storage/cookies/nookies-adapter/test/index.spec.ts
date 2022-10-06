import * as nookies from "nookies";

import { DomainStorage } from "domain/contracts/gateways";

import { CookiesNookiesAdapter } from "..";

type SUT = {
  cookiesStorage: DomainStorage;
};

const makeSut = (): SUT => {
  const cookiesStorage = new CookiesNookiesAdapter();

  return {
    cookiesStorage,
  };
};

let sut: SUT = null;

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
        .spyOn(nookies, "setCookie")
        .mockImplementation((key, value) => {
          data.key = key;
          data.value = value;
        });

      sut.cookiesStorage.set(input);

      expect(data).toMatchObject(input);
      expect(spySetItem).toBeCalledWith(input.key, input.value);
    });

    it("should return error when some wrong happen", () => {
      const input = {
        key: "key",
        value: "value",
      };

      const spySetItem = jest
        .spyOn(nookies, "setCookie")
        .mockImplementation((key, value) => {
          throw new Error("some error");
        });

      const output = sut.cookiesStorage.set(input);

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
        .spyOn(nookies, "getItem")
        .mockImplementation((key): string => {
          data.key = key;
          return mockRetData;
        });

      const output = sut.cookiesStorage.get(input);

      expect(data).toMatchObject(input);
      expect(output).toEqual(mockRetData);
      expect(spyGetItem).toBeCalledWith(input.key);
    });

    it("should return null when the key not exists", () => {
      const input = { key: "key" };
      const spyGetItem = jest
        .spyOn(nookies, "getItem")
        .mockImplementation((key): string => null);

      const output = sut.cookiesStorage.get(input);

      expect(output).toEqual(null);
      expect(spyGetItem).toBeCalledWith(input.key);
    });
  });

  describe("When call the 'remove' method", () => {
    it("should remove a value successfully", () => {
      const data = { key: null };
      const input = { key: "key" };
      const spyRemoveItem = jest
        .spyOn(nookies, "removeItem")
        .mockImplementation((key) => {
          data.key = key;
        });

      sut.cookiesStorage.remove(input);

      expect(data).toMatchObject(input);
      expect(spyRemoveItem).toBeCalledWith(input.key);
    });
  });
});
