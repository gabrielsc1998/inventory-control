import { ROUTES } from "common/routes";
import { LOCAL_STORAGE } from "common/keys";
import { error, success } from "domain/helpers/status";
import { LocalStorage } from "domain/contracts/gateways";
import { RefreshToken } from "domain/modules/auth/use-cases";
import { ServiceAPI } from "application/contracts/services/api";

type Input = {
  access_token: string;
};

type Output = {
  token: string;
  refreshToken: string;
};

export class RefreshTokenUseCase implements RefreshToken {
  constructor(
    private readonly serviceAPI: ServiceAPI,
    private readonly localStorage: LocalStorage
  ) {}

  async execute(): Promise<RefreshToken.Output> {
    try {
      const refreshToken = this.localStorage.get({
        key: LOCAL_STORAGE.REFRESH_TOKEN,
      });

      const output = await this.serviceAPI.send<Input, Output>({
        method: "post",
        endpoint: ROUTES.REFRESH_TOKEN,
        body: { access_token: refreshToken },
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      const { status, data } = output;
      if (status === 200) {
        this.localStorage.set({ key: LOCAL_STORAGE.TOKEN, value: data.token });
        this.localStorage.set({
          key: LOCAL_STORAGE.REFRESH_TOKEN,
          value: data.refreshToken,
        });

        return success();
      } else {
        return error(new Error("Error to refresh token"));
      }
    } catch (exception) {
      return error(exception);
    }
  }
}
