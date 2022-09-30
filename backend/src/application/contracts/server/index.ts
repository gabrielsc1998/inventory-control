export interface Server {
  on(input: Server.OnInput): void;
  listen(input: Server.ListInput): void;
  middlewareRegister(middlare: any): void;
}

export namespace Server {
  export type Methods = "GET" | "POST" | "PUT" | "DELETE";
  export type OnInput = {
    route: string;
    method: Methods;
    handler: <TRequest = unknown, TResponse = unknown>(
      request: TRequest,
      response: TResponse
    ) => any;
  };

  export type ListInput = {
    port: number;
    callback?: () => void;
  };
}
