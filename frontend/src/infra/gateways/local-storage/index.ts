import { LocalStorage } from "domain/contracts/gateways";

export class LocalStorageGateway implements LocalStorage {
  set(input: LocalStorage.SetInput): LocalStorage.SetOutput {
    try {
      localStorage.setItem(input.key, input.value);
    } catch (error) {
      return error;
    }
  }

  get(input: LocalStorage.GetInput): LocalStorage.GetOutput {
    // if (!this.exists()) {
    //   return null;
    // }
    return localStorage.getItem(input.key);
  }

  remove(input: LocalStorage.RemoveInput): void {
    localStorage.removeItem(input.key);
  }

  // private exists(): boolean {
  //   return typeof window !== "undefined";
  // }
}
