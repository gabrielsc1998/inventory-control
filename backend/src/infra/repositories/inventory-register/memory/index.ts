import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";

export class InventoryRegisterRepositoryInMemory
  implements InventoryRegisterRepository
{
  private categories: Array<InventoryRegisterRepository.InventoryRegisterModel> =
    [];

  create(input: InventoryRegisterRepository.CreateInput): Promise<void> {
    this.categories.push(input);
    return Promise.resolve();
  }
}
