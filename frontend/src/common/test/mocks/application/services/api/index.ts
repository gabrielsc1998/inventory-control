import { ServiceAPI } from "application/contracts/services/api";

export class ServiceAPIMock implements ServiceAPI {
  send<TInput = any, TOutputData = any>(
    input: ServiceAPI.Input<TInput>
  ): Promise<ServiceAPI.Output<TOutputData>> {
    return;
  }
}
