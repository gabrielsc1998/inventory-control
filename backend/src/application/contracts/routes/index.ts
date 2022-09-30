import { Server } from "../server";
import { Controller } from "../controllers";
import { Middleware } from "../middlewares";

export type Routes = {
  [key: string]: {
    method: Server.Methods;
    path: string;
    controller: Controller;
    middleware?: Middleware;
  };
};
