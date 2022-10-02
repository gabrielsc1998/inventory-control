import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { HttpResponse } from "@/application/contracts/http";
import { AddProduct } from "@/domain/modules/product/use-cases";
import { Controller } from "@/application/contracts/controllers";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { InventoryRegisterType } from "@/domain/modules/inventory-register/types";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";

export type AddInventoryProductInput = {
  productId: string;
  quantity: number;
};

export class AddInventoryProductController implements Controller {
  constructor(
    private readonly addProductUseCase: AddProduct,
    private readonly createRegister: CreateInventoryRegister
  ) {}

  async handle(request: {
    body: AddInventoryProductInput;
  }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    } as AddInventoryProductInput;

    const expectedFields = ["productId", "quantity"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const dtoAddProduct = {
      id: dtoRequest.productId,
      quantity: dtoRequest.quantity,
    };
    const output = await this.addProductUseCase.execute(dtoAddProduct);

    const productNotFound = output instanceof NotFoundError;
    if (productNotFound) {
      return response.notFound(output);
    }

    const hasError = output instanceof InvalidParamError;
    if (hasError) {
      return response.badRequest(output);
    }

    const dtoCreateInventoryRegister: CreateInventoryRegister.Input = {
      productId: dtoAddProduct.id,
      quantity: dtoAddProduct.quantity,
      type: InventoryRegisterType.INPUT,
    };

    await this.createRegister.execute(dtoCreateInventoryRegister);

    return response.ok(output);
  }
}
