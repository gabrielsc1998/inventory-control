import * as response from "@/application/helpers";
import { hasAllFields } from "@/application/validators";
import { InvalidCredentialsError } from "@/domain/errors";
import { AuthLogin } from "@/domain/modules/auth/use-cases";
import { HttpResponse } from "@/application/contracts/http";
import { Controller } from "@/application/contracts/controllers";

export class LoginController implements Controller {
  constructor(private readonly loginUseCase: AuthLogin) {}
  async handle(request: { body: AuthLogin.Input }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["email", "password"];

    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });
    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.loginUseCase.execute(
      dtoRequest as AuthLogin.Input
    );

    if (output instanceof InvalidCredentialsError) {
      return response.unauthorized();
    }

    return response.ok(output);
  }
}
