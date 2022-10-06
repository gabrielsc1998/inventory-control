import { STORAGE } from "common/keys";
import { Logout } from "domain/modules/auth/use-cases";
import { DomainStorage } from "domain/contracts/gateways";

export class LogoutUseCase implements Logout {
  constructor(private readonly localStorage: DomainStorage) {}

  async execute(): Promise<void> {
    this.localStorage.remove({ key: STORAGE.TOKEN });
    this.localStorage.remove({ key: STORAGE.REFRESH_TOKEN });
    return Promise.resolve();
  }
}
