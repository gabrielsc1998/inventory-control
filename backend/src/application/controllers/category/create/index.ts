import * as response from "@/application/helpers";
import { InvalidParamError } from "@/domain/errors";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { CreateCategory } from "@/domain/modules/category/use-cases";

export class CreateCategoryController implements Controller {
  constructor(private readonly createCategoryUseCase: CreateCategory) {}

  async handle(request: { body: CreateCategory.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["name"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.createCategoryUseCase.execute(
      dtoRequest as CreateCategory.Input
    );

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    return response.ok(output);
  }
}
