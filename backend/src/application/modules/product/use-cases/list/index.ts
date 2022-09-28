import { Pagination } from "@/domain/contracts/gateways";
import { ListProducts } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";

export class ListProductsUseCase implements ListProducts {
  constructor(
    private readonly repository: ProductRepository,
    private readonly pagination: Pagination
  ) {}

  async execute(input?: ListProducts.Input): Promise<ListProducts.Output> {
    if (!input) {
      return await this.repository.findAll();
    }

    const hasPagination = Boolean(input.pagination);
    const pagination = hasPagination
      ? this.pagination.create(input.pagination)
      : null;

    const hasFilters = Boolean(input.filters);
    const filters = hasFilters ? input.filters : null;

    return await this.repository.findAll({
      filters,
      pagination,
    });
  }
}
