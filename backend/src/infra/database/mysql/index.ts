import mysql, { Connection } from "promise-mysql";

import { ConnectionError } from "@/infra/errors";

import { MYSQL_CONFIG } from "./config";

class MySQLAdapter {
  private client: Connection = null;

  async connect(): Promise<void | ConnectionError> {
    const connection = await mysql.createConnection(MYSQL_CONFIG).catch(() => {
      return new ConnectionError("MySQL Database");
    });

    const hasConnectionError = connection instanceof ConnectionError;
    if (hasConnectionError) {
      const error = connection;
      return error;
    }

    this.client = connection;
  }

  async query<TReturn = unknown>(
    query: string,
    values?: any
  ): Promise<TReturn> {
    if (this.client === null) {
      return null;
    }
    return await this.client.query(query, values);
  }
}

export const MySQL = new MySQLAdapter();
