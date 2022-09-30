import { PaginationGateway } from "@/infra/gateways";
import { Pagination } from "@/domain/contracts/gateways";

export const makePagination = (): Pagination => {
  return PaginationGateway;
};
