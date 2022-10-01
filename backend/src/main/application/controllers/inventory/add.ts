import { AddInventoryProductController } from "@/application/controllers/inventory";

import { makeAddProductUseCase } from "../../modules/product/use-cases";
import { makeCreateInventoryRegisterUseCase } from "../../modules/inventory-register";

export const makeAddInventoryProductController =
  (): AddInventoryProductController => {
    const createInventoryRegister = makeCreateInventoryRegisterUseCase();
    const addProductUseCase = makeAddProductUseCase();
    return new AddInventoryProductController(
      addProductUseCase,
      createInventoryRegister
    );
  };
