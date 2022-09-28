import { CategoryRepository } from "@/domain/modules/category/repository";

export class CategoryRepositoryInMemory implements CategoryRepository {
  private categories: Array<CategoryRepository.CategoryModel> = [];

  create(input: CategoryRepository.CreateInput): Promise<void> {
    this.categories.push(input);
    return Promise.resolve();
  }

  findAll(): Promise<CategoryRepository.FindAllOutput> {
    return Promise.resolve(this.categories);
  }
}
