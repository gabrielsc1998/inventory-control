import { Request, Response } from "express";

import { Controller } from "@/application/contracts/controllers";

export const controllerHandlerExpressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const dtoRequest = {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
    };

    const output = await controller.handle(dtoRequest);

    const responseWithoutErrors =
      output.statusCode >= 200 && output.statusCode <= 299;

    const data = responseWithoutErrors
      ? output.body
      : { error: output.body.message };

    res.status(output.statusCode).json(data);
  };
};
