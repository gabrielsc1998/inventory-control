import { InvalidParamError } from "@/domain/errors";
import { IDGenerator } from "@/domain/contracts/gateways";
import { Product } from "@/domain/modules/product/entity";
import { CreateProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";

export class CreateProductUseCase implements CreateProduct {
  constructor(
    private readonly idGenerator: IDGenerator,
    private readonly repository: ProductRepository
  ) {}

  async execute(input: CreateProduct.Input): Promise<CreateProduct.Output> {
    if (!input) {
      return new InvalidParamError("create product input");
    }

    const dtoCreateProduct: Product.Input = {
      id: this.idGenerator.generate(),
      name: input.name,
      categoryId: input.categoryId,
    };

    const product = Product.create(dtoCreateProduct);

    const hasError = product instanceof InvalidParamError;
    if (hasError) {
      const error = product;
      return error;
    }

    await this.repository.create(product);

    return { id: product.id };
  }
}
