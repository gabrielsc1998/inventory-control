import { MySQL } from "./infra/database/mysql";
import { ConnectionError } from "./infra/errors";
import { CategoryRepositoryMySQL } from "./infra/repositories/category/mysql";
import { ProductRepositoryMySQL } from "./infra/repositories/product/mysql";
import { initializeServer } from "./main/application/server";

const bootstrap = async (): Promise<void> => {
  try {
    const output = await MySQL.connect();
    if (output instanceof ConnectionError) {
      throw output;
    }
    console.log("Connected to MySQL Database");
    initializeServer();
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
