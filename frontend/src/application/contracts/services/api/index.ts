export interface ServiceAPI {
  send<TInput = any, TOutputData = any>(
    input: ServiceAPI.Input<TInput>
  ): Promise<ServiceAPI.Output<TOutputData>>;
}

export namespace ServiceAPI {
  export type Input<TBody = any> = {
    method: "get" | "post" | "put" | "delete";
    endpoint: string;
    body?: TBody;
  };

  export type Output<TData = any> =
    | {
        status: number;
        data?: TData;
      }
    | Error;
}
