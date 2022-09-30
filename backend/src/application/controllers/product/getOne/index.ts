import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { GetOneProduct } from "@/domain/modules/product/use-cases";

export class GetOneProductController implements Controller {
  constructor(private readonly getOneProductUseCase: GetOneProduct) {}

  async handle(request: {
    params: GetOneProduct.Input;
  }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.params || {}),
    };

    const expectedFields = ["id"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.getOneProductUseCase.execute(
      dtoRequest as GetOneProduct.Input
    );

    const hasInvalidParam = output instanceof InvalidParamError;
    if (hasInvalidParam) {
      return response.badRequest(output);
    }

    const productNotFound = output instanceof NotFoundError;
    if (productNotFound) {
      return response.notFound(output);
    }

    return response.ok(output);
  }
}
