import { AuthMiddleware } from "@/application/middlewares/auth";
import { makeTokenHandler } from "@/main/infra/gateways/token-handler";

export const makeAuthMiddleware = (): AuthMiddleware => {
  const { tokenHandler } = makeTokenHandler();
  return new AuthMiddleware(tokenHandler);
};
