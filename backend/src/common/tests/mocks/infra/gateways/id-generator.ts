import { IDGenerator } from "@/domain/contracts/gateways";

export const idGeneratorMock = {
  generatedId: "generated-id",
};

export class IDGeneratorMock implements IDGenerator {
  generate: () => string;

  static generate(): string {
    return idGeneratorMock.generatedId;
  }
}
