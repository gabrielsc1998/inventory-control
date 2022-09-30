export interface CategoryRepository {
  create(input: CategoryRepository.CreateInput): Promise<void>;
  findAll(): Promise<CategoryRepository.FindAllOutput>;
  findById(id: string): Promise<CategoryRepository.FindByIdOutput>;
}

export namespace CategoryRepository {
  export type CategoryModel = {
    id: string;
    name: string;
  };

  export type CreateInput = CategoryModel;
  export type FindAllOutput = Array<CategoryModel>;
  export type FindByIdOutput = CategoryModel;
}
