import { Request, Response, NextFunction } from "express";

import { Middleware } from "@/application/contracts/middlewares";

export const middlewareHandlerExpressAdapter = (middleware: Middleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const output = await middleware.handle(req);

    const outputNotSigned = !output;
    if (outputNotSigned) {
      next();
      return;
    }

    res.status(output.statusCode).json({ error: output.body.message });
    return;
  };
};
