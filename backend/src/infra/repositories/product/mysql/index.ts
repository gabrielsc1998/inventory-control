import { ProductRepository } from "@/domain/modules/product/repository";

import { MySQL } from "@/infra/database/mysql";

const TABLE_NAME = "products";

type ProductMySqlModel = {
  id: string;
  name: string;
  quantity: number;
  category_id: string;
  category_name: string;
};

export class ProductRepositoryMySQL implements ProductRepository {
  private readonly mysql = MySQL;

  async create(input: ProductRepository.ProductModel): Promise<void> {
    const query = `INSERT INTO ${TABLE_NAME} (id, name, quantity, category_id) VALUES(?, ?, ?, ?)`;
    await this.mysql.query(query, [
      input.id,
      input.name,
      input.quantity,
      input.categoryId,
    ]);
  }

  update(
    input: ProductRepository.UpdateInput
  ): Promise<ProductRepository.ProductModel> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<ProductRepository.FindByIdOutput> {
    const query = `
      SELECT *, ct.name as category_name 
        FROM ${TABLE_NAME} as pd 
        JOIN categories as ct ON ct.id = pd.id 
        WHERE pd.id=${id} 
        LIMIT 1
    `;

    const product = (await this.mysql.query(query)) as Array<ProductMySqlModel>;

    if (!product) {
      return null;
    }

    return this.dtoOutput(product[0]);
  }

  async findAll(
    input?: ProductRepository.FindAllInput
  ): Promise<ProductRepository.FindAllOutput> {
    let pagination = "";
    const hasPagination = input?.pagination;
    if (hasPagination) {
      pagination = this.buildPagination(input?.pagination);
    }

    let filters = "";
    const hasFilters = input?.filters;
    if (hasFilters) {
      filters = this.buildFilters(input.filters);
    }

    const query = `
      SELECT *, ct.name as category_name 
      FROM ${TABLE_NAME} as pd 
      JOIN categories as ct ON ct.id = pd.id 
      ${filters}
      ${pagination} 
    `;

    const products = (await this.mysql.query(
      query
    )) as Array<ProductMySqlModel>;

    return products.map((product) => this.dtoOutput(product));
  }

  private buildPagination(
    pagination: ProductRepository.FindAllInput["pagination"]
  ): string {
    let paginationData = "";
    const limit = pagination?.limit;
    if (typeof limit === "number") {
      paginationData = `LIMIT ${limit}`;
    }
    const offset = pagination?.offset;
    if (typeof offset === "number") {
      paginationData = `${paginationData} OFFSET ${offset}`;
    }

    return paginationData;
  }

  private buildFilters(filters: ProductRepository.FindAllFilters): string {
    let filtersData = "WHERE";
    Object.keys(filters).forEach(
      (key: keyof ProductRepository.FindAllFilters) => {
        let filterKey: string = key;
        if (filterKey === "categoryId") {
          filterKey = "category_id";
        }
        const condition = `${filterKey}=${filters[key]}`;
        if (filtersData === "WHERE") {
          filtersData = `${filtersData} ${condition}`;
        } else {
          filtersData = `${filtersData} AND ${condition}`;
        }
      }
    );

    return filtersData;
  }

  private dtoOutput(
    product: ProductMySqlModel
  ): ProductRepository.ProductModel & { categoryName: string } {
    return {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      categoryId: product.category_id,
      categoryName: product.category_name,
    };
  }
}
