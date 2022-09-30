export interface Middleware<TRequest = unknown> {
  handle(request: TRequest): Promise<void | Error>;
}
