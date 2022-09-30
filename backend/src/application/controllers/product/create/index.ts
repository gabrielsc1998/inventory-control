import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { CreateProduct } from "@/domain/modules/product/use-cases";
import { CheckIfExistCategory } from "@/domain/modules/category/use-cases";

export class CreateProductController implements Controller {
  constructor(
    private readonly createProductUseCase: CreateProduct,
    private readonly checkIfExistsCategoryUseCase: CheckIfExistCategory
  ) {}

  async handle(request: { body: CreateProduct.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["name", "categoryId"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const categoryExists = await this.checkIfExistsCategoryUseCase.execute({
      id: dtoRequest.categoryId,
    });

    if (!categoryExists) {
      return response.notFound(new NotFoundError(`Category`));
    }

    const output = await this.createProductUseCase.execute(
      dtoRequest as CreateProduct.Input
    );

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    return response.ok(output);
  }
}
