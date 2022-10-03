export interface LocalStorage {
  set(input: LocalStorage.SetInput): LocalStorage.SetOutput;
  get(input: LocalStorage.GetInput): LocalStorage.GetOutput;
  remove(input: LocalStorage.RemoveInput): LocalStorage.RemoveOutput;
}

export namespace LocalStorage {
  export type SetInput = { key: string; value: string };
  export type SetOutput = void | Error;

  export type GetInput = { key: string };
  export type GetOutput = string | null;

  export type RemoveInput = { key: string };
  export type RemoveOutput = void;
}
