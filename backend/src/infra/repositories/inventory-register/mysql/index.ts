import { InventoryRegisterRepository } from "@/domain/modules/inventory-register/repository";

import { MySQL } from "@/infra/database/mysql";

const TABLE_NAME = "inventory_registers";

export class InventoryRegisterRepositoryMySQL
  implements InventoryRegisterRepository
{
  private readonly mysql = MySQL;

  async create(
    input: InventoryRegisterRepository.InventoryRegisterModel
  ): Promise<void> {
    const query = `INSERT INTO ${TABLE_NAME} (id, product_id, quantity, type) VALUES(?, ?, ?, ?)`;
    await this.mysql.query(query, [
      input.id,
      input.productId,
      input.quantity,
      input.type,
    ]);
  }
}
