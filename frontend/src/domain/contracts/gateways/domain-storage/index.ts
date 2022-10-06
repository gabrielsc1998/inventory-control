export interface DomainStorage {
  set(input: DomainStorage.SetInput): DomainStorage.SetOutput;
  get(input: DomainStorage.GetInput): DomainStorage.GetOutput;
  remove(input: DomainStorage.RemoveInput): DomainStorage.RemoveOutput;
}

export namespace DomainStorage {
  export type SetInput<TCtx = any> = { key: string; value: string; ctx?: TCtx };
  export type SetOutput = void | Error;

  export type GetInput<TCtx = any> = { key: string; ctx?: TCtx };
  export type GetOutput = string | null;

  export type RemoveInput<TCtx = any> = { key: string; ctx?: TCtx };
  export type RemoveOutput = void;
}
