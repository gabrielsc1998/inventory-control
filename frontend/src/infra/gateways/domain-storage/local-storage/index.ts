import { DomainStorage } from "domain/contracts/gateways";

export class LocalStorageGateway implements DomainStorage {
  set(input: DomainStorage.SetInput): DomainStorage.SetOutput {
    try {
      if (!this.exists()) {
        return null;
      }
      localStorage.setItem(input.key, input.value);
    } catch (error) {
      return error;
    }
  }

  get(input: DomainStorage.GetInput): DomainStorage.GetOutput {
    if (!this.exists()) {
      return null;
    }
    return localStorage.getItem(input.key);
  }

  remove(input: DomainStorage.RemoveInput): void {
    if (!this.exists()) {
      return null;
    }
    localStorage.removeItem(input.key);
  }

  private exists(): boolean {
    return typeof window !== "undefined";
  }
}
