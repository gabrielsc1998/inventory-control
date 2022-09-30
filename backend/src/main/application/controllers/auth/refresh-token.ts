import { RefreshTokenController } from "@/application/controllers/auth";

import { makeAuthRefreshTokenUseCase } from "../../modules/auth/use-cases/refresh-token";

export const makeRefreshTokenController = (): RefreshTokenController => {
  const refreshTokenUseCase = makeAuthRefreshTokenUseCase();
  return new RefreshTokenController(refreshTokenUseCase);
};
