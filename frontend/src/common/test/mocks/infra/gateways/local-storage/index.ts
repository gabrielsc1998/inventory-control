import { LocalStorage } from "domain/contracts/gateways";

export class LocalStorageMock implements LocalStorage {
  set(input: LocalStorage.SetInput): LocalStorage.SetOutput {
    return;
  }
  get(input: LocalStorage.GetInput): string {
    return;
  }
  remove(input: LocalStorage.RemoveInput): void {
    return;
  }
}
