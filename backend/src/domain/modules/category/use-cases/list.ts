export interface ListCategories {
  execute(): Promise<ListCategories.Output>;
}

export namespace ListCategories {
  export type Output = Array<{ id: string; name: string }>;
}
