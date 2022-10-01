import { RemoveInventoryProductController } from "@/application/controllers/inventory";

import { makeRemoveProductUseCase } from "../../modules/product/use-cases";
import { makeCreateInventoryRegisterUseCase } from "../../modules/inventory-register";

export const makeRemoveInventoryProductController =
  (): RemoveInventoryProductController => {
    const createInventoryRegister = makeCreateInventoryRegisterUseCase();
    const removeProductUseCase = makeRemoveProductUseCase();
    return new RemoveInventoryProductController(
      removeProductUseCase,
      createInventoryRegister
    );
  };
