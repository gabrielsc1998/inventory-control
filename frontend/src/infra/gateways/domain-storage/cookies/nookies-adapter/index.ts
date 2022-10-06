import * as nookies from "nookies";

import { DomainStorage } from "domain/contracts/gateways/domain-storage";

export class CookiesNookiesAdapter implements DomainStorage {
  private readonly cookies = nookies;

  set(input: DomainStorage.SetInput): DomainStorage.SetOutput {
    const ctx = input?.ctx;
    this.cookies.setCookie(ctx, input.key, input.value, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  get(input: DomainStorage.GetInput): string {
    const ctx = input?.ctx;
    const cookies = this.cookies.parseCookies(ctx);
    return cookies[input.key];
  }

  remove(input: DomainStorage.RemoveInput): void {
    const ctx = input?.ctx;
    this.cookies.destroyCookie(ctx, input.key, {
      path: "/",
    });
  }
}
