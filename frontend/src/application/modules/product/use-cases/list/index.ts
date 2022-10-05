import { ROUTES } from "common/routes";
import { error, success } from "domain/helpers/status";
import { ProductModel } from "domain/modules/product/model";
import { ServiceAPI } from "application/contracts/services/api";
import { ListProducts } from "domain/modules/product/use-cases";
import { DEFAULT_PAGE_SIZE } from "common/constants";

type APIReturn = {
  data: Array<ProductModel>;
  total: number;
  meta: { page: number };
};

export class ListProductsUseCase implements ListProducts {
  constructor(private readonly serviceAPI: ServiceAPI) {}

  async execute(input: ListProducts.Input): Promise<ListProducts.Output> {
    try {
      const pagination = input?.pagination || {
        page: 1,
        size: DEFAULT_PAGE_SIZE,
      };

      const endpointFilters = `?page=${pagination.page}&size=${
        pagination.size || DEFAULT_PAGE_SIZE
      }`;

      const output = await this.serviceAPI.send<undefined, APIReturn>({
        method: "get",
        endpoint: `${ROUTES.GET_PRODUCTS}${endpointFilters}`,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      if (output.status >= 200 && output.status <= 299) {
        return success({
          data: output.data.data || [],
          total: output.data.total,
        });
      }

      return error(new Error("Error to list the products"));
    } catch (exception) {
      return error(exception);
    }
  }
}
