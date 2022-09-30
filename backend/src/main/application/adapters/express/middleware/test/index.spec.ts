import { Middleware } from "@/application/contracts/middlewares";
import { HttpResponse } from "@/application/contracts/http";
import { badRequest, ok } from "@/application/helpers";

import { middlewareHandlerExpressAdapter } from "../";

const makeSut = () => {
  class MiddlewareMock implements Middleware {
    async handle(request: unknown): Promise<HttpResponse> {
      return undefined;
    }
  }

  const middleware = new MiddlewareMock();
  const adapter = middlewareHandlerExpressAdapter(middleware);

  return {
    adapter,
    middleware,
  };
};

const sut = makeSut();

describe("Middleware [ Express Adapter ]", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should next when the middleware return is success", async () => {
    let nextCalled = false;
    await sut.adapter(null, null, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBeTruthy();
  });

  it("should to sign the 'res' with data of error when the middleware return is error", async () => {
    const errorRet = badRequest(new Error("error"));
    jest.spyOn(sut.middleware, "handle").mockResolvedValue(errorRet);

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

    let nextCalled = false;
    await sut.adapter(null, res as any, () => {});

    expect(nextCalled).toBeFalsy();
    expect(expected.body).toEqual(errorRet.body.message);
    expect(expected.statusCode).toEqual(errorRet.statusCode);
  });
});
