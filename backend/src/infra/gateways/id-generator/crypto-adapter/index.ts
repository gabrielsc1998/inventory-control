import { randomUUID as uuid } from "crypto";

import { IDGenerator } from "@/domain/contracts/gateways";

export class IDGeneratorCryptoAdapter implements IDGenerator {
  generate: () => string;

  public static generate(): string {
    return uuid();
  }
}
