import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { Category } from "@/domain/modules/category/entity";
import { CreateCategory } from "@/domain/modules/category/use-cases";
import { CategoryRepository } from "@/domain/modules/category/repository";

export class CreateCategoryUseCase implements CreateCategory {
  constructor(
    private readonly idGenerator: IDGenerator,
    private readonly repository: CategoryRepository
  ) {}

  async execute(input: CreateCategory.Input): Promise<CreateCategory.Output> {
    if (!input) {
      return new InvalidParamError("create category input");
    }

    const dtoCreateCategory: Category.Input = {
      id: this.idGenerator.generate(),
      name: input.name,
    };

    const category = Category.create(dtoCreateCategory);

    const hasError = category instanceof InvalidParamError;
    if (hasError) {
      const error = category;
      return error;
    }

    await this.repository.create(category);

    return category;
  }
}
