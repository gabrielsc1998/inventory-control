import { CategoryRepository } from "@/domain/modules/category/repository";
import { CheckIfExistCategory } from "@/domain/modules/category/use-cases";

export class CheckIfExistCategoryUseCase implements CheckIfExistCategory {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(
    input: CheckIfExistCategory.Input
  ): Promise<CheckIfExistCategory.Output> {
    const id = input?.id;
    const category = await this.repository.findById(id);
    const categoryExists = category !== null;
    return categoryExists;
  }
}
