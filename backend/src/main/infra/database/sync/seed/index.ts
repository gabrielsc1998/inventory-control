import { faker } from "@faker-js/faker";

faker.locale = "pt_BR";

import { makeIdGenerator } from "@/main/infra/gateways/id-generator";
import { makeProductRepository } from "@/main/infra/repositories/product";
import { makeCategoryRepository } from "@/main/infra/repositories/category";

type Output = {
  execute(): Promise<void>;
};

export const makeDatabaseSeed = (): Output => {
  const idGenerator = makeIdGenerator();
  const productRepository = makeProductRepository();
  const categoryRepository = makeCategoryRepository();

  const execute = async (): Promise<void> => {
    const categories = await categoryRepository.findAll();
    if (categories.length === 0) {
      const fakeCategories = [
        {
          id: "",
          name: faker.commerce.department(),
        },
        {
          id: "",
          name: faker.commerce.department(),
        },
        {
          id: "",
          name: faker.commerce.department(),
        },
        {
          id: "",
          name: faker.commerce.department(),
        },
        {
          id: "",
          name: faker.commerce.department(),
        },
      ];

      for await (const category of fakeCategories) {
        category.id = idGenerator.generate();
        await categoryRepository.create(category);
      }

      const TOTAL_OF_PRODUCTS = 150;
      const QTD_PRODUCTS_BY_CATEGORY =
        TOTAL_OF_PRODUCTS / fakeCategories.length;

      let currentCategoryIndex = 0;
      let ctrlQtdProducts = 0;
      for (let i = 0; i < TOTAL_OF_PRODUCTS; i++) {
        const categoryId = fakeCategories[currentCategoryIndex].id;

        const product = {
          id: idGenerator.generate(),
          name: faker.commerce.productName(),
          categoryId,
          quantity: 0,
        };

        await productRepository.create(product);

        ctrlQtdProducts++;
        if (ctrlQtdProducts === QTD_PRODUCTS_BY_CATEGORY) {
          ctrlQtdProducts = 0;
          currentCategoryIndex++;
        }
      }
    }
  };

  return {
    execute,
  };
};
