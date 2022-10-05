import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ProductModel } from "domain/modules/product/model";
import { ServiceAPI } from "application/contracts/services/api";
import { ListProducts } from "domain/modules/product/use-cases";

export class ListProductsUseCase implements ListProducts {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: ListProducts.Input): Promise<ListProducts.Output> {
    try {
      const output = await this.serviceAPI.send<undefined, Array<ProductModel>>(
        {
          method: "get",
          endpoint: ROUTES.GET_PRODUCTS,
        }
      );

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success(output.data || []);
      }

      return error(new Error("Error to list the products"));
    } catch (exception) {
      return error(exception);
    }
  }
}
