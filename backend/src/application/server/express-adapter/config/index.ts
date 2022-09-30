import express, { json, urlencoded } from "express";

export const setDefaultMiddlewares = (app: express.Express) => {
  app.use(json());

  app.use(
    urlencoded({
      extended: true,
    })
  );

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.set("access-control-allow-origin", "*");
      res.set("access-control-allow-headers", "*");
      res.set("access-control-allow-methods", "*");
      next();
    }
  );
};
