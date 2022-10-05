import * as response from "@/application/helpers";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { ListProducts } from "@/domain/modules/product/use-cases";

export class ListProductsController implements Controller {
  constructor(private readonly listProductsUseCase: ListProducts) {}

  async handle(request: { query: ListProducts.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.query || {}),
    };

    const output = await this.listProductsUseCase.execute(
      dtoRequest as ListProducts.Input
    );

    if (output.data.length === 0) {
      return response.noContent();
    }

    return response.ok({
      data: output.data,
      total: output.total,
      meta: {
        page: dtoRequest?.pagination?.page || 1,
      },
    });
  }
}
