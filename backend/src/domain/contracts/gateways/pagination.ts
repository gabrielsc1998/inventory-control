export interface Pagination {
  create(input?: Pagination.Input): Pagination.Output;
}

export namespace Pagination {
  export type Input = {
    page?: number;
    size?: number;
  };

  export type Output = {
    offset: number;
    limit: number;
  };
}
