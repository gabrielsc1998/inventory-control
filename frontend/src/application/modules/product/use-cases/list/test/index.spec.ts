import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ListProducts } from "domain/modules/product/use-cases";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";

import { ListProductsUseCase } from "..";

type SUT = {
  listProductsUseCase: ListProducts;
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const listProductsUseCase = new ListProductsUseCase(serviceAPI);

  return {
    listProductsUseCase,
    serviceAPI,
  };
};

let sut: SUT = null;

describe("List Products [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should get the products successfully", async () => {
    const mockOutput = {
      status: 200,
      data: {
        data: [
          {
            id: "1",
            name: "prod-1",
            quantity: 10,
            categoryId: "1",
            categoryName: "cat-1",
          },
          {
            id: "2",
            name: "prod-2",
            quantity: 10,
            categoryId: "1",
            categoryName: "cat-1",
          },
        ],
        total: 2,
      },
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const output = await sut.listProductsUseCase.execute();

    expect(output).toMatchObject(success(mockOutput.data));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_PRODUCTS,
      body: undefined,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const output = await sut.listProductsUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_PRODUCTS,
      body: undefined,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const output = await sut.listProductsUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_PRODUCTS,
      body: undefined,
    });
  });
});
