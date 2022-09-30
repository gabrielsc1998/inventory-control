import { UserLogin } from "@/domain/modules/user/use-cases";
import { makeTokenHandler } from "@/main/infra/gateways/token-handler";
import { UserLoginUseCase } from "@/application/modules/user/use-cases";

export const makeUserLoginUseCase = (): UserLogin => {
  const { tokenHandler } = makeTokenHandler();
  return new UserLoginUseCase(tokenHandler);
};
