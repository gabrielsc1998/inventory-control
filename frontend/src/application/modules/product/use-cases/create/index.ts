import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ServiceAPI } from "application/contracts/services/api";
import { CreateProduct } from "domain/modules/product/use-cases";

export class CreateProductUseCase implements CreateProduct {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: CreateProduct.Input): Promise<CreateProduct.Output> {
    try {
      const output = await this.serviceAPI.send<
        CreateProduct.Input,
        { id: string }
      >({
        method: "post",
        endpoint: ROUTES.CREATE_PRODUCT,
        body: input,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success(output.data);
      }

      return error(new Error("Error to create the product"));
    } catch (exception) {
      return error(exception);
    }
  }
}
