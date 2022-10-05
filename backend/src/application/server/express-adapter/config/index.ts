import cors from "cors";

import express, { json, urlencoded } from "express";

export const setDefaultMiddlewares = (app: express.Express) => {
  app.use(json());

  app.use(
    urlencoded({
      extended: true,
    })
  );

  app.use(cors());
};
