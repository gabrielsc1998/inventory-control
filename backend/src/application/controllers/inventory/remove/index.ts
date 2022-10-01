import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { RemoveProduct } from "@/domain/modules/product/use-cases";
import { InventoryRegisterType } from "@/domain/modules/inventory-register/types";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { CreateInventoryRegisterUseCase } from "@/application/modules/inventory-register/use-cases/create";

export class RemoveInventoryProductController implements Controller {
  constructor(
    private readonly addProductUseCase: RemoveProduct,
    private readonly createInventoryRegister: CreateInventoryRegister
  ) {}

  async handle(request: { body: RemoveProduct.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["id", "quantity"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const dtoRemoveProduct = dtoRequest as RemoveProduct.Input;
    const output = await this.addProductUseCase.execute(dtoRemoveProduct);

    const productNotFound = output instanceof NotFoundError;
    if (productNotFound) {
      return response.notFound(output);
    }

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    const unavailableQuantity = output instanceof Error;
    if (unavailableQuantity) {
      return response.badRequest(output);
    }

    const dtoCreateInventoryRegister: CreateInventoryRegister.Input = {
      productId: dtoRemoveProduct.id,
      quantity: dtoRemoveProduct.quantity,
      type: InventoryRegisterType.OUTPUT,
    };

    await this.createInventoryRegister.execute(dtoCreateInventoryRegister);

    return response.ok(output);
  }
}
