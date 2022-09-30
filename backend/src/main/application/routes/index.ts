import { join } from "path";
import { readdirSync } from "fs";

import { Server } from "@/application/contracts/server";
import { Routes } from "@/application/contracts/routes";
import { Controller } from "@/application/contracts/controllers";
import { Middleware } from "@/application/contracts/middlewares";

interface Input {
  server: Server;
  middleware: (middleware: Middleware) => any;
  handler: (controller: Controller) => any;
}

export const loadRoutes = (input: Input): void => {
  const ROUTES_ROOT_DIR = "./app/";
  readdirSync(join(__dirname, ROUTES_ROOT_DIR)).map(async (file) => {
    if (!file.endsWith(".map") && !file.includes("index")) {
      const routes = (await import(`${ROUTES_ROOT_DIR}${file}`))
        .default as Routes;

      Object.keys(routes).forEach((key: keyof Routes) => {
        const route = routes[key];
        if (route.middleware) {
          const middleware = input.middleware(route.middleware);
          input.server.middlewareRegister(middleware);
        }
        input.server.on({
          route: route.path,
          method: route.method,
          handler: input.handler(route.controller),
        });
      });
    }
  });
};
