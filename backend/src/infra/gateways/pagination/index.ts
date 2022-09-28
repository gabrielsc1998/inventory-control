import { Pagination } from "@/domain/contracts/gateways/pagination";

export class PaginationGateway implements Pagination {
  create: (input?: Pagination.Input) => Pagination.Output;

  static create(input: Pagination.Input = {}): Pagination.Output {
    let { page = 1, size = 0 } = input;

    if (page < 1) {
      page = 1;
    }

    if (size < 0) {
      size = 0;
    }

    return {
      offset: (page - 1) * size,
      limit: size,
    };
  }
}
