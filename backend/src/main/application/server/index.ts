import { ServerExpressAdapter } from "@/application/server/express-adapter";

import { loadRoutes } from "../routes";
import { controllerHandlerExpressAdapter } from "../adapters/express/controller";
import { middlewareHandlerExpressAdapter } from "../adapters/express/middleware";

export const initializeServer = (): void => {
  const httpServer = new ServerExpressAdapter();

  loadRoutes({
    server: httpServer,
    handler: controllerHandlerExpressAdapter,
    middleware: middlewareHandlerExpressAdapter,
  });

  const PORT = Number(process.env.SERVER_PORT);
  httpServer.listen({
    port: PORT,
    callback: () => {
      console.log(`Server running on port ${PORT}`);
    },
  });
};
