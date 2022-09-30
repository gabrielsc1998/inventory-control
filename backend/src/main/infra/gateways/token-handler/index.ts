import { CONFIG } from "@/common/config";
import { TokenHandler } from "@/domain/contracts/gateways";
import { TokenHandlerJWTAdapter } from "@/infra/gateways/token-handler/jwt/jsonwebtoken-adapter";

export const makeTokenHandler = (): { tokenHandler: TokenHandler } => {
  const secret = CONFIG.JWT_SECRET;
  const tokenHandler = new TokenHandlerJWTAdapter(secret);
  return { tokenHandler };
};
