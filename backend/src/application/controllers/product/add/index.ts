import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { AddProduct } from "@/domain/modules/product/use-cases";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";

export class AddProductController implements Controller {
  constructor(private readonly addProductUseCase: AddProduct) {}

  async handle(request: { body: AddProduct.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["id", "quantity"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.addProductUseCase.execute(
      dtoRequest as AddProduct.Input
    );

    const productNotFound = output instanceof NotFoundError;
    if (productNotFound) {
      return response.notFound(output);
    }

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    return response.ok(output);
  }
}
