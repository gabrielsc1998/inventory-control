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
    listen: (port: Number, cb?: any) => {},
    get: (method: string, cb?: any) => {},
    post: (method: string, cb?: any) => {},
    put: (method: string, cb?: any) => {},
    delete: (method: string, cb?: any) => {},
  });
});

describe("Express Adapter [ Server ]", () => {
  beforeAll(() => (sut = makeSut()));
  beforeEach(() => jest.clearAllMocks());

  it("should start the server successfully", () => {
    const serverTest = sut.server as any;
    const spyList = jest.spyOn(serverTest._app, "listen");

    const input: Server.ListInput = { port: 3000, callback: () => {} };
    sut.server.listen(input);

    expect(spyList).toBeCalledWith(input.port, expect.any(Function));
  });

  ["get", "post", "put", "delete"].forEach((method) => {
    it(`should on method [${method}] successfully`, () => {
      const serverTest = sut.server as any;

      const input: Server.OnInput = {
        method: method.toUpperCase() as Server.Methods,
        callback: (): void => {
          return;
        },
        route: "route",
      };

      const spyOn = jest.spyOn(serverTest._app, method);
      sut.server.on(input);
      expect(spyOn).toBeCalledWith(input.route, expect.any(Function));
    });
  });
});
