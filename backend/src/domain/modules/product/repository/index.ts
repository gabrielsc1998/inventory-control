import { Pagination } from "@/domain/contracts/gateways";

export interface ProductRepository {
  create(input: ProductRepository.CreateInput): Promise<void>;
  findById(id: string): Promise<ProductRepository.FindByIdOutput>;
  findAll(
    input?: ProductRepository.FindAllInput
  ): Promise<ProductRepository.FindAllOutput>;
}

export namespace ProductRepository {
  export type ProductModel = {
    id: string;
    name: string;
    quantity: number;
    categoryId: string;
  };

  export type CreateInput = ProductModel;

  export type FindByIdOutput = ProductModel | null;

  export type FindAllFilters = { categoryId?: string; name?: string };
  export type FindAllInput = {
    filters?: FindAllFilters;
    pagination?: Pagination.Output;
  };
  export type FindAllOutput = Array<ProductModel>;
}