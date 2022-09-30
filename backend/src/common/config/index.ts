import { randomUUID } from "crypto";

export const CONFIG = {
  JWT_SECRET: randomUUID(),
};
