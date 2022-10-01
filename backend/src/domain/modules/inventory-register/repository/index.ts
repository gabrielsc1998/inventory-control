import { InventoryRegisterType } from "../types";

export interface InventoryRegisterRepository {
  create(input: InventoryRegisterRepository.CreateInput): Promise<void>;
}

export namespace InventoryRegisterRepository {
  export type InventoryRegisterModel = {
    id: string;
    productId: string;
    quantity: number;
    type: InventoryRegisterType;
  };

  export type CreateInput = InventoryRegisterModel;
}
