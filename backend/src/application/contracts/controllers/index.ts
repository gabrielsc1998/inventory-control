import { HttpResponse } from "../http";

export interface Controller<TRequest = unknown> {
  handle(request: TRequest): Promise<HttpResponse>;
}
