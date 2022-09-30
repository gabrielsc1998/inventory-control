import { Product } from "@/domain/modules/product/entity";
import { RemoveProduct } from "@/domain/modules/product/use-cases";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { ProductRepository } from "@/domain/modules/product/repository";

export class RemoveProductUseCase implements RemoveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: RemoveProduct.Input): Promise<RemoveProduct.Output> {
    if (!input) {
      return new InvalidParamError("remove product input");
    }

    const currentProduct = await this.repository.findById(input.id);

    if (!currentProduct) {
      return new NotFoundError(`Product [id = ${input.id}]`);
    }

    const product = Product.create(currentProduct) as Product;
    const errorToRemove = product.remove(input.quantity);

    if (errorToRemove) {
      return errorToRemove;
    }

    const updatedProduct = await this.repository.update({
      id: product.id,
      quantity: product.quantity,
    });

    return {
      id: updatedProduct.id,
      quantity: updatedProduct.quantity,
    };
  }
}
