import { makePagination } from "@/main/infra/gateways/pagination";
import { ListProducts } from "@/domain/modules/product/use-cases";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { ListProductsUseCase } from "@/application/modules/product/use-cases";

export const makeListProductsUseCase = (): ListProducts => {
  const pagination = makePagination();
  const repository = makeProductRepository();
  return new ListProductsUseCase(repository, pagination);
};
