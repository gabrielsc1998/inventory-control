import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ServiceAPI } from "application/contracts/services/api";
import { RemoveProducts } from "domain/modules/product/use-cases";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";

import { RemoveProductsUseCase } from "..";

type SUT = {
  removeProductsUseCase: RemoveProducts;
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const removeProductsUseCase = new RemoveProductsUseCase(serviceAPI);

  return {
    removeProductsUseCase,
    serviceAPI,
  };
};

let sut: SUT = null;

describe("Remove Products [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should remove the product successfully", async () => {
    const mockOutput = {
      status: 200,
      data: {
        id: "1",
        quantity: 0,
      },
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const input = { productId: "1", quantity: 10 };
    const output = await sut.removeProductsUseCase.execute(input);

    expect(output).toMatchObject(success(mockOutput.data));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.SUB_PRODUCTS,
      body: input,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const input = { productId: "1", quantity: 10 };
    const output = await sut.removeProductsUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.SUB_PRODUCTS,
      body: input,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const input = { productId: "1", quantity: 10 };
    const output = await sut.removeProductsUseCase.execute(input);

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "post",
      endpoint: ROUTES.SUB_PRODUCTS,
      body: input,
    });
  });
});
