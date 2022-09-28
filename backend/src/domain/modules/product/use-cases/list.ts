import { Pagination } from "@/domain/contracts/gateways";

import { ProductRepository } from "../repository";

export interface ListProducts {
  execute(input?: ListProducts.Input): Promise<ListProducts.Output>;
}

export namespace ListProducts {
  export type Input = {
    filters?: ProductRepository.FindAllFilters;
    pagination?: Pagination.Input;
  };

  export type Output = Array<{
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
    categoryName: string;
  }>;
}
