import * as response from "@/application/helpers";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { ListCategories } from "@/domain/modules/category/use-cases";

export class ListCategoriesController implements Controller {
  constructor(private readonly listCategoriesUseCase: ListCategories) {}

  async handle(): Promise<HttpResponse> {
    const output = await this.listCategoriesUseCase.execute();

    if (output.length === 0) {
      return response.noContent();
    }

    return response.ok(output);
  }
}
