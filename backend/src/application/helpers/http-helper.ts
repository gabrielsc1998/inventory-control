import { NotFoundError } from "@/domain/errors";
import { HttpResponse } from "@/application/contracts/http";

import { UnauthorizedError } from "../errors";

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const notFound = (error: NotFoundError): HttpResponse => ({
  statusCode: 404,
  body: error,
});
