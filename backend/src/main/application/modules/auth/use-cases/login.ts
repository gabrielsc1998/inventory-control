import { AuthLogin } from "@/domain/modules/auth/use-cases";
import { makeTokenHandler } from "@/main/infra/gateways/token-handler";
import { AuthLoginUseCase } from "@/application/modules/auth/use-cases";

export const makeAuthLoginUseCase = (): AuthLogin => {
  const { tokenHandler } = makeTokenHandler();
  return new AuthLoginUseCase(tokenHandler);
};
