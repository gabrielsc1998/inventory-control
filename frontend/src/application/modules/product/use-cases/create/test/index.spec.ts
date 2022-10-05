import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ServiceAPI } from "application/contracts/services/api";
import { CreateProduct } from "domain/modules/product/use-cases";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";

import { CreateProductUseCase } from "..";

type SUT = {
  createProductUseCase: CreateProduct;
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const createProductUseCase = new CreateProductUseCase(serviceAPI);

  return {
    createProductUseCase,
    serviceAPI,
  };
};

let sut: SUT = null;

describe("Create Product [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should create the product successfully", async () => {
    const mockOutput = {
      status: 200,
      data: {
        id: "1",
      },
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input = { name: "name", categoryId: "cat-1" };
    const output = await sut.createProductUseCase.execute(input);

    expect(output).toMatchObject(success(mockOutput.data));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.CREATE_PRODUCT,
      body: input,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const input = { name: "name", categoryId: "cat-1" };
    const output = await sut.createProductUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.CREATE_PRODUCT,
      body: input,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const input = { name: "name", categoryId: "cat-1" };
    const output = await sut.createProductUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.CREATE_PRODUCT,
      body: input,
    });
  });
});
