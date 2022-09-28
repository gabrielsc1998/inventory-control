import { ProductRepository } from "@/domain/modules/product/repository";

export class ProductRepositoryInMemory implements ProductRepository {
  products: Array<ProductRepository.ProductModel> = [];

  create(input: ProductRepository.CreateInput): Promise<void> {
    this.products.push(input);
    return Promise.resolve();
  }

  findById(id: string): Promise<ProductRepository.FindByIdOutput> {
    const product = this.products.find((product) => product.id === id);
    return Promise.resolve(
      product ? { ...product, categoryName: "category-name" } : null
    );
  }

  findAll(
    input?: ProductRepository.FindAllInput
  ): Promise<ProductRepository.FindAllOutput> {
    const hasFilters = Boolean(input?.filters);

    let filteredData: Array<ProductRepository.ProductModel> = [
      ...this.products,
    ];
    if (hasFilters) {
      const filterKeys = Object.keys(input.filters);

      filterKeys.forEach((key: keyof ProductRepository.FindAllFilters) => {
        filteredData = filteredData.filter(
          (data) => data[key] !== undefined && data[key] === input.filters[key]
        );
      });

      if (filteredData.length === 0) {
        return Promise.resolve([]);
      }
    }

    const usedArray = hasFilters ? filteredData : this.products;

    const hasPagination = Boolean(input?.pagination);
    const paginatedData: Array<ProductRepository.ProductModel> = [];
    if (hasPagination) {
      const start = input.pagination.offset;
      const end = start + input.pagination.limit;
      for (let i = start; i < end; i++) {
        i >= usedArray.length ? (i = end) : paginatedData.push(usedArray[i]);
      }
      return Promise.resolve(
        paginatedData.map((product, index) => ({
          ...product,
          categoryName: `cat-name-${index}`,
        }))
      );
    } else {
      return Promise.resolve(
        usedArray.map((product, index) => ({
          ...product,
          categoryName: `cat-name-${index}`,
        }))
      );
    }
  }
}
