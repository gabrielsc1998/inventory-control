export interface ListProducts {
  execute(): Promise<ListProducts.Output>;
}

export namespace ListProducts {
  export type Output = Array<{
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
  }>;
}
