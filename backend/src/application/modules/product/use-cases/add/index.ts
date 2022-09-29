import { Product } from "@/domain/modules/product/entity";
import { AddProduct } from "@/domain/modules/product/use-cases";
import { InvalidParamError, NotFoundError } from "@/domain/errors";
import { ProductRepository } from "@/domain/modules/product/repository";

export class AddProductUseCase implements AddProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: AddProduct.Input): Promise<AddProduct.Output> {
    if (!input) {
      return new InvalidParamError("add product input");
    }

    const currentProduct = await this.repository.findById(input.id);

    if (!currentProduct) {
      return new NotFoundError(`Product [id = ${input.id}]`);
    }

    const product = Product.create(currentProduct) as Product;
    product.add(input.quantity);

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
