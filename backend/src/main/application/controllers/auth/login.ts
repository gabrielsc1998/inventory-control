import { LoginController } from "@/application/controllers/auth";

import { makeUserLoginUseCase } from "../../modules/user/use-cases/login";

export const makeLoginController = (): LoginController => {
  const loginUseCase = makeUserLoginUseCase();
  return new LoginController(loginUseCase);
};
