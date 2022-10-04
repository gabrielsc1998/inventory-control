import { ROUTES } from "common/routes";
import { Login } from "domain/modules/auth/use-cases";
import { ServiceAPI } from "application/contracts/services/api";
import { LocalStorage } from "domain/contracts/gateways";
import { LOCAL_STORAGE } from "common/keys";

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
    private readonly localStorage: LocalStorage
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
        return output;
      }

      const { status, data } = output;
      if (status === 200) {
        this.localStorage.set({ key: LOCAL_STORAGE.TOKEN, value: data.token });
        this.localStorage.set({
          key: LOCAL_STORAGE.REFRESH_TOKEN,
          value: data.refreshToken,
        });
      } else {
        return new Error("Invalid credentials");
      }
    } catch (error) {
      return error;
    }
  }
}
