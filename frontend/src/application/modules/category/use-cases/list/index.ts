import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { CategoryModel } from "domain/modules/category/model";
import { ServiceAPI } from "application/contracts/services/api";
import { ListCategories } from "domain/modules/category/use-cases";

export class ListCategoriesUseCase implements ListCategories {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input?: ListCategories.Input): Promise<ListCategories.Output> {
    try {
      const output = await this.serviceAPI.send<
        undefined,
        Array<CategoryModel>
      >({
        method: "get",
        endpoint: ROUTES.GET_CATEGORIES,
        noCache: input?.noCache,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success(output.data || []);
      }

      return error(new Error("Error to list the Categories"));
    } catch (exception) {
      return error(exception);
    }
  }
}
