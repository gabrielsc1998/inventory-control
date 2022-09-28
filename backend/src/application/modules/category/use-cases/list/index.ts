import { Category } from "@/domain/modules/category/entity";
import { ListCategories } from "@/domain/modules/category/use-cases";
import { CategoryRepository } from "@/domain/modules/category/repository";

export class ListCategoriesUseCase implements ListCategories {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(): Promise<ListCategories.Output> {
    return await this.repository.findAll();
  }
}
