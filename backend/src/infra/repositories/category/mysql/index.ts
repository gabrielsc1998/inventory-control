import { CategoryRepository } from "@/domain/modules/category/repository";

import { MySQL } from "@/infra/database/mysql";

const TABLE_NAME = "categories";

export class CategoryRepositoryMySQL implements CategoryRepository {
  private readonly mysql = MySQL;

  async create(input: CategoryRepository.CategoryModel): Promise<void> {
    const query = `INSERT INTO ${TABLE_NAME} (id, name) VALUES(?, ?)`;
    await this.mysql.query(query, [input.id, input.name]);
  }

  async findAll(): Promise<CategoryRepository.FindAllOutput> {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    const categories = await this.mysql.query(query);
    return categories as CategoryRepository.FindAllOutput;
  }

  async findById(id: string): Promise<CategoryRepository.CategoryModel> {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE id=${id}`;
    const category = await this.mysql.query(query);
    if (!category) {
      return null;
    }
    return category as CategoryRepository.CategoryModel;
  }
}
