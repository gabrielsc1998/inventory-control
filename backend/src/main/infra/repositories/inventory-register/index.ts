import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";
import { InventoryRegisterRepositoryInMemory } from "@/infra/repositories/inventory-register/memory";

export const makeInventoryRegisterRepository =
  (): InventoryRegisterRepository => {
    return new InventoryRegisterRepositoryInMemory();
  };
