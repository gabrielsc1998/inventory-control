import { HttpResponse } from "../http";

export interface Middleware<TRequest = unknown> {
  handle(request: TRequest): Promise<void | HttpResponse>;
}
