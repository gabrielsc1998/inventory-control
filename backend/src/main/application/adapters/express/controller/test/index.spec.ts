import { Controller } from "@/application/contracts/controllers";
import { HttpResponse } from "@/application/contracts/http";
import { badRequest, ok } from "@/application/helpers";
import { controllerHandlerExpressAdapter } from "../";

const makeSut = () => {
  class ControllerMock implements Controller {
    async handle(request: unknown): Promise<HttpResponse> {
      return ok("");
    }
  }

  const controller = new ControllerMock();
  const adapter = controllerHandlerExpressAdapter(controller);

  return {
    adapter,
    controller,
  };
};

const sut = makeSut();

describe("Controller [ Express Adapter ]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should to sign the 'res' with data of success when the controller return is success", async () => {
    let expected: { statusCode: number; body: any } = {
      statusCode: null,
      body: null,
    };

    const res = {
      status: (status: number) => {
        expected.statusCode = status;
        return {
          json: (data: string) => {
            expected.body = data;
          },
        };
      },
    };

    await sut.adapter(null, res as any);

    const successRet = ok("");
    expect(expected.body).toEqual(successRet.body);
    expect(expected.statusCode).toBe(successRet.statusCode);
  });

  it("should to sign the 'res' with data of error when the controller return is error", async () => {
    const errorRet = badRequest(new Error("error"));
    jest.spyOn(sut.controller, "handle").mockResolvedValue(errorRet);

    let expected: { statusCode: number; body: any } = {
      statusCode: null,
      body: null,
    };

    const res = {
      status: (status: number) => {
        expected.statusCode = status;
        return {
          json: (data: any) => {
            expected.body = data.error;
          },
        };
      },
    };

    await sut.adapter(null, res as any);

    expect(expected.body).toEqual(errorRet.body.message);
    expect(expected.statusCode).toEqual(errorRet.statusCode);
  });
});
