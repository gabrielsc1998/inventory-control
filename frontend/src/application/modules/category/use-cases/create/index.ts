import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { CategoryModel } from "domain/modules/category/model";
import { ServiceAPI } from "application/contracts/services/api";
import { CreateCategory } from "domain/modules/category/use-cases";

export class CreateCategoryUseCase implements CreateCategory {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: CreateCategory.Input): Promise<CreateCategory.Output> {
    try {
      const output = await this.serviceAPI.send<
        CreateCategory.Input,
        { id: string }
      >({
        method: "post",
        endpoint: ROUTES.CREATE_CATEGORY,
        body: input,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success(output.data);
      }

      return error(new Error("Error to create the category"));
    } catch (exception) {
      return error(exception);
    }
  }
}
