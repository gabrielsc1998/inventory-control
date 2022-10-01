import { ConnectionConfig } from "promise-mysql";

export const MYSQL_CONFIG: ConnectionConfig = {
  host: process.env.DB_MYSQL_HOST || "",
  user: process.env.DB_MYSQL_USER || "",
  database: process.env.DB_MYSQL_DATABASE || "",
  password: process.env.DB_MYSQL_PASSWORD || "",
};
