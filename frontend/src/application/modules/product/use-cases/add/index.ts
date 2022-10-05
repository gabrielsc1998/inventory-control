import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { AddProducts } from "domain/modules/product/use-cases";
import { ServiceAPI } from "application/contracts/services/api";

export class AddProductsUseCase implements AddProducts {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: AddProducts.Input): Promise<AddProducts.Output> {
    try {
      const output = await this.serviceAPI.send<
        AddProducts.Input,
        { id: string; quantity: number }
      >({
        method: "post",
        endpoint: ROUTES.ADD_PRODUCTS,
        body: input,
      });

      console.log(output);

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
