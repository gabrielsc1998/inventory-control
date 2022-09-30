import { UserRefreshToken } from "@/domain/modules/user/use-cases";
import { makeTokenHandler } from "@/main/infra/gateways/token-handler";
import { UserRefreshTokenUseCase } from "@/application/modules/user/use-cases";

export const makeUserRefreshTokenUseCase = (): UserRefreshToken => {
  const { tokenHandler } = makeTokenHandler();
  return new UserRefreshTokenUseCase(tokenHandler);
};
