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

  async update(
    input: ProductRepository.UpdateInput
  ): Promise<ProductRepository.ProductModel> {
    const product = await this.findById(input.id);
    if (!product) {
      return null;
    }

    const newProduct = { ...product };

    if (input?.name) {
      newProduct.name = input.name;
    }

    if (typeof input?.quantity === "number") {
      newProduct.quantity = input.quantity;
    }

    const query = `
      UPDATE ${TABLE_NAME} 
      SET 
        name='${newProduct.name}',
        quantity='${newProduct.quantity}'
      WHERE id='${newProduct.id}'
    `;

    await this.mysql.query(query);

    return newProduct;
  }

  async findById(id: string): Promise<ProductRepository.FindByIdOutput> {
    const query = `
      SELECT pd.id, pd.name, pd.quantity, pd.category_id, ct.name as category_name
        FROM ${TABLE_NAME} as pd 
        JOIN categories as ct ON ct.id = pd.category_id
        WHERE pd.id='${id}'
        LIMIT 1
    `;

    const product = (await this.mysql.query(query)) as Array<ProductMySqlModel>;

    if (!product[0]) {
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

    let queryList = `
      SELECT pd.id, pd.name, pd.quantity, pd.category_id, ct.name as category_name 
      FROM ${TABLE_NAME} as pd 
      JOIN categories as ct ON ct.id = pd.category_id
    `;

    if (hasPagination) {
      queryList = `${queryList} ${pagination}`;
    }

    if (hasFilters) {
      queryList = `${queryList} ${filters}`;
    }

    const products = (await this.mysql.query(
      queryList
    )) as Array<ProductMySqlModel>;

    const queryCount = `
      SELECT COUNT(pd.id) as total
      FROM ${TABLE_NAME} as pd 
      JOIN categories as ct ON ct.id = pd.category_id
      ${filters}
    `;

    const count = (await this.mysql.query(queryCount)) as Array<{
      total: number;
    }>;

    return {
      data: products.map((product) => this.dtoOutput(product)),
      total: count[0].total,
    };
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
