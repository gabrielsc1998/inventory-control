import { Server } from "@/application/contracts/server";

import { ServerExpressAdapter } from "..";

type SUT = {
  server: Server;
};

const makeSut = (): SUT => {
  const server = new ServerExpressAdapter();

  return {
    server,
  };
};

let sut: SUT = null;

jest.mock("../config", () => {
  return {
    setDefaultMiddlewares: jest.fn(),
  };
});

jest.mock("express", () => {
  return () => ({
    use: (req: any, res: any, next: any) => {},
    listen: (port: Number, cb?: any) => {},
    get: (method: string, cb?: any) => {},
    post: (method: string, cb?: any) => {},
    put: (method: string, cb?: any) => {},
    delete: (method: string, cb?: any) => {},
  });
});

let abstractServer: any;

describe("Express Adapter [ Server ]", () => {
  beforeAll(() => {
    sut = makeSut();
    abstractServer = sut.server as any;
  });

  beforeEach(() => jest.clearAllMocks());

  it("should start the server successfully", () => {
    const spyList = jest.spyOn(abstractServer._app, "listen");

    const input: Server.ListInput = { port: 3000, callback: () => {} };
    sut.server.listen(input);

    expect(spyList).toBeCalledWith(input.port, expect.any(Function));
  });

  it("should register the middleware", () => {
    const spyUse = jest.spyOn(abstractServer._app, "use");

    sut.server.middlewareRegister(() => {});

    expect(spyUse).toBeCalledWith(expect.any(Function));
  });

  ["get", "post", "put", "delete"].forEach((method) => {
    it(`should on method [${method}] successfully`, () => {
      const input: Server.OnInput = {
        method: method.toUpperCase() as Server.Methods,
        handler: (): void => {
          return;
        },
        route: "route",
      };

      const spyOn = jest.spyOn(abstractServer._app, method);
      sut.server.on(input);
      expect(spyOn).toBeCalledWith(input.route, expect.any(Function));
    });
  });
});
