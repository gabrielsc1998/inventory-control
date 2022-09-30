import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { RemoveProduct } from "@/domain/modules/product/use-cases";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";

export class RemoveProductController implements Controller {
  constructor(private readonly addProductUseCase: RemoveProduct) {}

  async handle(request: { body: RemoveProduct.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["id", "quantity"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.addProductUseCase.execute(
      dtoRequest as RemoveProduct.Input
    );

    const productNotFound = output instanceof NotFoundError;
    if (productNotFound) {
      return response.notFound(output);
    }

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    const unavailableQuantity = output instanceof Error;
    if (unavailableQuantity) {
      return response.badRequest(output);
    }

    return response.ok(output);
  }
}
