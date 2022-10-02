import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";
import { InventoryRegisterRepositoryMySQL } from "@/infra/repositories/inventory-register/mysql";

export const makeInventoryRegisterRepository =
  (): InventoryRegisterRepository => {
    return new InventoryRegisterRepositoryMySQL();
  };
