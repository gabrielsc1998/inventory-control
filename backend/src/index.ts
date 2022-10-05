import { MySQL } from "./infra/database/mysql";
import { ConnectionError } from "./infra/errors";
import { initializeServer } from "./main/application/server";
import { makeDatabaseSeed } from "./main/infra/database/sync/seed";

const bootstrap = async (): Promise<void> => {
  try {
    const output = await MySQL.connect();
    if (output instanceof ConnectionError) {
      throw output;
    }
    console.log("Connected to MySQL Database");

    /* --- DATABASE SEED --- */

    const databaseSeed = makeDatabaseSeed();
    await databaseSeed.execute();

    /* --- DATABASE SEED --- */

    initializeServer();
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
