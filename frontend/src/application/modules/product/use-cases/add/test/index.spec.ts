import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ServiceAPI } from "application/contracts/services/api";
import { AddProducts } from "domain/modules/product/use-cases";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";

import { AddProductsUseCase } from "..";

type SUT = {
  addProductsUseCase: AddProducts;
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const addProductsUseCase = new AddProductsUseCase(serviceAPI);

  return {
    addProductsUseCase,
    serviceAPI,
  };
};

let sut: SUT = null;

describe("Add Products [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should add the product successfully", async () => {
    const mockOutput = {
      status: 200,
      data: {
        id: "1",
        quantity: 10,
      },
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input = { productId: "1", quantity: 10 };
    const output = await sut.addProductsUseCase.execute(input);

    expect(output).toMatchObject(success(mockOutput.data));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.ADD_PRODUCTS,
      body: input,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const input = { productId: "1", quantity: 10 };
    const output = await sut.addProductsUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.ADD_PRODUCTS,
      body: input,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const input = { productId: "1", quantity: 10 };
    const output = await sut.addProductsUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.ADD_PRODUCTS,
      body: input,
    });
  });
});
