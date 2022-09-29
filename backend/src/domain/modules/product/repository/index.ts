import { Pagination } from "@/domain/contracts/gateways";

export interface ProductRepository {
  create(input: ProductRepository.CreateInput): Promise<void>;
  update(
    input: ProductRepository.UpdateInput
  ): Promise<ProductRepository.UpdateOutput>;
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

  export type UpdateInput = {
    id: string;
    name?: string;
    quantity?: number;
  };

  export type UpdateOutput = ProductModel | null;

  export type FindByIdOutput = (ProductModel & { categoryName: string }) | null;

  export type FindAllFilters = { categoryId?: string; name?: string };
  export type FindAllInput = {
    filters?: FindAllFilters;
    pagination?: Pagination.Output;
  };
  export type FindAllOutput = Array<ProductModel & { categoryName: string }>;
}
