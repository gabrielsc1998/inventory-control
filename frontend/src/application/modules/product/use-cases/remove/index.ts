import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { RemoveProducts } from "domain/modules/product/use-cases";
import { ServiceAPI } from "application/contracts/services/api";

export class RemoveProductsUseCase implements RemoveProducts {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: RemoveProducts.Input): Promise<RemoveProducts.Output> {
    try {
      const output = await this.serviceAPI.send<
        RemoveProducts.Input,
        { id: string; quantity: number }
      >({
        method: "post",
        endpoint: ROUTES.SUB_PRODUCTS,
        body: input,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success(output.data);
      }

      return error(new Error("Error to add the products"));
    } catch (exception) {
      return error(exception);
    }
  }
}
