import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { LocalStorage } from "domain/contracts/gateways";
import { ServiceAPI } from "application/contracts/services/api";

import { AXIOS_CONFIG } from "./config";
import { tokenMiddleware } from "./middlewares/auth";
import { refreshTokenMiddleware } from "./middlewares/refresh-token";

export class ServiceAPIAxiosAdapter implements ServiceAPI {
  client: AxiosInstance;

  constructor(private readonly localStorage: LocalStorage) {
    this.client = axios.create(AXIOS_CONFIG);
    this.configInterceptors();
  }

  async send<TInput = any, TOutputData = any>(
    input: ServiceAPI.Input<TInput>
  ): Promise<ServiceAPI.Output<TOutputData>> {
    try {
      const output = (await this.client[input.method](
        input.endpoint,
        input.body
      )) as ServiceAPI.Output<TOutputData>;

      const hasError = output instanceof Error;
      if (hasError) {
        throw output;
      }
      return output;
    } catch (error) {
      return error;
    }
  }

  private configInterceptors(): void {
    this.client.interceptors.request.use(tokenMiddleware(this.localStorage));
    createAuthRefreshInterceptor(
      this.client,
      refreshTokenMiddleware(this.client, this.localStorage)
    );
  }
}
