import { LOCAL_STORAGE } from "common/keys";
import { Logout } from "domain/modules/auth/use-cases";
import { LocalStorage } from "domain/contracts/gateways";

export class LogoutUseCase implements Logout {
  constructor(private readonly localStorage: LocalStorage) {}

  async execute(): Promise<void> {
    this.localStorage.remove({ key: LOCAL_STORAGE.TOKEN });
    this.localStorage.remove({ key: LOCAL_STORAGE.REFRESH_TOKEN });
    return Promise.resolve();
  }
}
