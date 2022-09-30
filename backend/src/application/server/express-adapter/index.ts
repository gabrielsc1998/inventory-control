import express from "express";

import { Server } from "@/application/contracts/server";

import { setDefaultMiddlewares } from "./config";

type ExpressMethods = "get" | "post" | "put" | "delete";

export class ServerExpressAdapter implements Server {
  private readonly _app: express.Express;

  constructor() {
    this._app = express();
    setDefaultMiddlewares(this._app);
  }

  listen(input: Server.ListInput): void {
    this._app.listen(input.port, input.callback);
  }

  on(input: Server.OnInput): void {
    const method = input.method.toLowerCase() as ExpressMethods;
    this._app[method](input.route, input.callback);
  }
}
