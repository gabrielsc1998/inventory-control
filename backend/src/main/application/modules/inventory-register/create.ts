import { makeIdGenerator } from "@/main/infra/gateways/id-generator";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { makeInventoryRegisterRepository } from "@/main/infra/repositories/inventory-register";
import { CreateInventoryRegisterUseCase } from "@/application/modules/inventory-register/use-cases/create";

export const makeCreateInventoryRegisterUseCase =
  (): CreateInventoryRegister => {
    const idGenerator = makeIdGenerator();
    const repository = makeInventoryRegisterRepository();
    return new CreateInventoryRegisterUseCase(idGenerator, repository);
  };
