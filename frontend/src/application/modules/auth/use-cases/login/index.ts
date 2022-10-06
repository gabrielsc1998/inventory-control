import { ROUTES } from "common/routes";
import { STORAGE } from "common/keys";
import { error, success } from "domain/helpers/status";
import { Login } from "domain/modules/auth/use-cases";
import { DomainStorage } from "domain/contracts/gateways";
import { ServiceAPI } from "application/contracts/services/api";

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
  refreshToken: string;
};

export class LoginUseCase implements Login {
  constructor(
    private readonly serviceAPI: ServiceAPI,
    private readonly domainStorage: DomainStorage
  ) {}

  async execute(input: Login.Input): Promise<Login.Output> {
    try {
      const output = await this.serviceAPI.send<Input, Output>({
        method: "post",
        endpoint: ROUTES.LOGIN,
        body: input,
      });

      const hasError = output instanceof Error;
      if (hasError) {
        return error(output);
      }

      const { status, data } = output;
      if (status === 200) {
        this.domainStorage.set({ key: STORAGE.TOKEN, value: data.token });
        this.domainStorage.set({
          key: STORAGE.REFRESH_TOKEN,
          value: data.refreshToken,
        });

        return success();
      } else {
        return error(new Error("Invalid credentials"));
      }
    } catch (exception) {
      return error(exception);
    }
  }
}
