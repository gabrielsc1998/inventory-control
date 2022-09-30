import * as response from "@/application/helpers";
import { InvalidTokenError } from "@/domain/errors";
import { HttpResponse } from "@/application/contracts/http";
import { hasAllFields } from "@/application/validators/fields";
import { Controller } from "@/application/contracts/controllers";
import { AuthRefreshToken } from "@/domain/modules/auth/use-cases";

export class RefreshTokenController implements Controller {
  constructor(private readonly refreshTokenUseCase: AuthRefreshToken) {}
  async handle(request: {
    body: { access_token: string };
  }): Promise<HttpResponse> {
    const dtoRequest = {
      ...(request?.body || {}),
    };

    const expectedFields = ["access_token"];
    const fieldError = hasAllFields({ expectedFields, dto: dtoRequest });

    if (fieldError) {
      return response.badRequest(new Error(`${fieldError} not provided`));
    }

    const output = await this.refreshTokenUseCase.execute({
      refreshToken: dtoRequest.access_token,
    });

    if (output instanceof InvalidTokenError) {
      return response.unauthorized();
    }

    return response.ok(output);
  }
}
