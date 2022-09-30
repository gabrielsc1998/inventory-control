import { LoginController } from "@/application/controllers/auth";

import { makeAuthLoginUseCase } from "../../modules/auth/use-cases/login";

export const makeLoginController = (): LoginController => {
  const loginUseCase = makeAuthLoginUseCase();
  return new LoginController(loginUseCase);
};
