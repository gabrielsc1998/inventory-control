import axios from "axios";

import { ServiceAPI } from "application/contracts/services/api";
import { LocalStorageMock } from "common/test/mocks/infra/gateways/local-storage";

import { ServiceAPIAxiosAdapter } from "..";

type SUT = {
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const localStorage = new LocalStorageMock();
  const serviceAPI = new ServiceAPIAxiosAdapter(localStorage);

  return {
    serviceAPI,
  };
};

let sut: SUT = null;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock as any;

let callUse = false;
jest.mock("axios", () => ({
  create: () => ({
    interceptors: {
      request: {
        use: () => {
          callUse = true;
        },
      },
    },
    get: () => {},
    post: () => {},
    put: () => {},
    delete: () => {},
  }),
}));

let mockSutClient: any;

describe("Axios adapter [ Service API ]", () => {
  beforeAll(() => {
    callUse = false;
    sut = makeSut();
    mockSutClient = sut.serviceAPI as any;
  });

  beforeEach(() => jest.clearAllMocks());

  it("should config the token interceptor", async () => {
    expect(callUse).toBeTruthy();
  });

  it("should get a data successfully", async () => {
    const method = "get";
    const mockOutput = {
      status: 200,
      data: { key: "value" },
    };

    const spyGet = jest
      .spyOn(mockSutClient.client, method)
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input: ServiceAPI.Input = {
      method: method,
      endpoint: "endpoint",
    };

    const output = await sut.serviceAPI.send(input);

    expect(output).toMatchObject(mockOutput);
    expect(spyGet).toBeCalledWith(input.endpoint, undefined);
  });

  it("should send a data successfully", async () => {
    const method = "post";
    const mockOutput = {
      status: 200,
      data: { key: "value" },
    };

    const spyPost = jest
      .spyOn(mockSutClient.client, method)
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input: ServiceAPI.Input<{ data: string }> = {
      method: method,
      endpoint: "endpoint",
      body: {
        data: "data",
      },
    };

    const output = await sut.serviceAPI.send(input);

    expect(output).toMatchObject(mockOutput);
    expect(spyPost).toBeCalledWith(input.endpoint, input.body);
  });

  it("should get an error", async () => {
    const method = "post";
    const mockOutput = new Error("some error");

    const spyPost = jest
      .spyOn(mockSutClient.client, method)
      .mockResolvedValue(new Error("some error"));

    const input: ServiceAPI.Input<{ data: string }> = {
      method: method,
      endpoint: "endpoint",
      body: {
        data: "data",
      },
    };

    const output = await sut.serviceAPI.send(input);

    expect(output).toMatchObject(mockOutput);
    expect(spyPost).toBeCalledWith(input.endpoint, input.body);
  });

  it("should catch the error", async () => {
    const method = "post";
    const mockOutput = new Error("some error");

    const spyPost = jest
      .spyOn(mockSutClient.client, method)
      .mockRejectedValue(new Error("some error"));

    const input: ServiceAPI.Input<{ data: string }> = {
      method: method,
      endpoint: "endpoint",
      body: {
        data: "data",
      },
    };

    const output = await sut.serviceAPI.send(input);

    expect(output).toMatchObject(mockOutput);
    expect(spyPost).toBeCalledWith(input.endpoint, input.body);
  });
});
