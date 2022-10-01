import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { CreateInventoryRegister } from "@/domain/modules/inventory-register/use-cases";
import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";

export class CreateInventoryRegisterUseCase implements CreateInventoryRegister {
  constructor(
    private readonly idGenerator: IDGenerator,
    private readonly repository: InventoryRegisterRepository
  ) {}

  async execute(
    input: CreateInventoryRegister.Input
  ): Promise<CreateInventoryRegister.Output> {
    if (!input) {
      return new InvalidParamError("create inventory register input");
    }

    const registerId = this.idGenerator.generate();
    const dtoCreateInventoryRegister: InventoryRegisterRepository.CreateInput =
      {
        id: registerId,
        productId: input.productId,
        quantity: input.quantity,
        type: input.type,
      };

    await this.repository.create(dtoCreateInventoryRegister);

    return { id: registerId };
  }
}
