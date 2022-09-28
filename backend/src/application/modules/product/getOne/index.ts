import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { GetOneProduct } from "@/domain/modules/product/use-cases";
import { ProductRepository } from "@/domain/modules/product/repository";

export class GetOneProductUseCase implements GetOneProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: GetOneProduct.Input): Promise<GetOneProduct.Output> {
    if (!input) {
      return new InvalidParamError("get one product input");
    }

    const product = await this.repository.findById(input.id);

    if (!product) {
      return new NotFoundError(`Product [id = ${input.id}]`);
    }

    return product;
  }
}
