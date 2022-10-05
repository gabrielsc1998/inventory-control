import * as response from "@/application/helpers";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { ListProducts } from "@/domain/modules/product/use-cases";

type ListProductsQuery = { page?: number; size?: number };

export class ListProductsController implements Controller {
  constructor(private readonly listProductsUseCase: ListProducts) {}

  async handle(request: { query: ListProductsQuery }): Promise<HttpResponse> {
    const dtoRequest: ListProductsQuery = {
      ...(request?.query || {}),
    };

    const dtoListProducts: ListProducts.Input = {
      pagination: {
        page: Number(dtoRequest.page || 1),
        size: dtoRequest?.size ? Number(dtoRequest?.size) : undefined,
      },
    };
    const output = await this.listProductsUseCase.execute(dtoListProducts);

    if (output.data.length === 0) {
      return response.noContent();
    }

    return response.ok({
      data: output.data,
      total: output.total,
      meta: {
        page: dtoListProducts.pagination?.page || 1,
      },
    });
  }
}
