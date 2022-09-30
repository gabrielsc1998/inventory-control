import { RefreshTokenController } from "@/application/controllers/auth";

import { makeUserRefreshTokenUseCase } from "../../modules/user/use-cases/refresh-token";

export const makeRefreshTokenController = (): RefreshTokenController => {
  const refreshTokenUseCase = makeUserRefreshTokenUseCase();
  return new RefreshTokenController(refreshTokenUseCase);
};
