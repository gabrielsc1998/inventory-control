import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ListCategories } from "domain/modules/category/use-cases";
import { ServiceAPI } from "application/contracts/services/api";
import { ServiceAPIMock } from "common/test/mocks/application/services/api";

import { ListCategoriesUseCase } from "..";

type SUT = {
  listCategoriesUseCase: ListCategories;
  serviceAPI: ServiceAPI;
};

const makeSut = (): SUT => {
  const serviceAPI = new ServiceAPIMock();
  const listCategoriesUseCase = new ListCategoriesUseCase(serviceAPI);

  return {
    listCategoriesUseCase,
    serviceAPI,
  };
};

let sut: SUT = null;

describe("List Categories [ Use Case ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should get the categories successfully", async () => {
    const mockOutput = {
      status: 200,
      data: [
        {
          id: "1",
          name: "cat-1",
        },
        {
          id: "2",
          name: "cat-2",
        },
      ],
    };

    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockImplementation(() => {
        return Promise.resolve(mockOutput);
      });

    const output = await sut.listCategoriesUseCase.execute();

    expect(output).toMatchObject(success(mockOutput.data));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_CATEGORIES,
      body: undefined,
    });
  });

  it("should get an error when the service api throw an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockResolvedValue(new Error("some error"));

    const output = await sut.listCategoriesUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_CATEGORIES,
      body: undefined,
    });
  });

  it("should catch an error", async () => {
    const spyServiceAPI = jest
      .spyOn(sut.serviceAPI, "send")
      .mockRejectedValue(new Error("some error"));

    const output = await sut.listCategoriesUseCase.execute();

    expect(output).toMatchObject(error(new Error("some error")));
    expect(spyServiceAPI).toBeCalledWith({
      method: "get",
      endpoint: ROUTES.GET_CATEGORIES,
      body: undefined,
    });
  });
});
