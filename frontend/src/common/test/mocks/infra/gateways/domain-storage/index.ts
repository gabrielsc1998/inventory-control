import { DomainStorage } from "domain/contracts/gateways";

export class DomainStorageMock implements DomainStorage {
  set(input: DomainStorage.SetInput): DomainStorage.SetOutput {
    return;
  }
  get(input: DomainStorage.GetInput): string {
    return;
  }
  remove(input: DomainStorage.RemoveInput): void {
    return;
  }
}
