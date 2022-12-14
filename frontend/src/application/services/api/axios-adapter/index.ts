import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { DomainStorage } from "domain/contracts/gateways";
import { ServiceAPI } from "application/contracts/services/api";

import { AXIOS_CONFIG } from "./config";
import { makeCacheAdapter } from "./cache";
import { tokenMiddleware } from "./middlewares/auth";
import { refreshTokenMiddleware } from "./middlewares/refresh-token";

const adapter = makeCacheAdapter();
const axiosInstance = axios.create({
  ...AXIOS_CONFIG,
  adapter: adapter.adapter,
});

export class ServiceAPIAxiosAdapter implements ServiceAPI {
  client: AxiosInstance;

  constructor(private readonly domainStorage: DomainStorage) {
    this.client = axiosInstance;
    this.configInterceptors();
  }

  async send<TInput = any, TOutputData = any>(
    input: ServiceAPI.Input<TInput>
  ): Promise<ServiceAPI.Output<TOutputData>> {
    try {
      if (input.noCache) {
        adapter.config.ignoreCache = true;
      }

      const output = (await this.client[input.method](
        input.endpoint,
        input.body
      )) as ServiceAPI.Output<TOutputData>;

      if (input.noCache) {
        adapter.config.ignoreCache = false;
      }

      const hasError = output instanceof Error;
      if (hasError) {
        throw output;
      }

      return output;
    } catch (error) {
      adapter.config.ignoreCache = false;
      return error;
    }
  }

  private configInterceptors(): void {
    this.client.interceptors.request.use(tokenMiddleware(this.domainStorage));
    createAuthRefreshInterceptor(
      this.client,
      refreshTokenMiddleware(this.client, this.domainStorage)
    );
  }
}
