import { AuthRefreshToken } from "@/domain/modules/auth/use-cases";
import { makeTokenHandler } from "@/main/infra/gateways/token-handler";
import { AuthRefreshTokenUseCase } from "@/application/modules/auth/use-cases";

export const makeAuthRefreshTokenUseCase = (): AuthRefreshToken => {
  const { tokenHandler } = makeTokenHandler();
  return new AuthRefreshTokenUseCase(tokenHandler);
};
