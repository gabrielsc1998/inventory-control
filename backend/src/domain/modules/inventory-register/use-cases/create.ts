import { InvalidParamError } from "@/domain/errors";

import { InventoryRegisterType } from "../types";

export interface CreateInventoryRegister {
  execute(
    input: CreateInventoryRegister.Input
  ): Promise<CreateInventoryRegister.Output>;
}

export namespace CreateInventoryRegister {
  export type Input = {
    productId: string;
    quantity: number;
    type: InventoryRegisterType;
  };

  type OutputError = InvalidParamError;
  export type Output =
    | {
        id: string;
      }
    | OutputError;
}
