import { TokenHandler } from "@/domain/contracts/gateways";
import { HttpResponse } from "@/application/contracts/http";
import { badRequest, unauthorized } from "@/application/helpers";
import { Middleware } from "@/application/contracts/middlewares";

export class AuthMiddleware implements Middleware<any> {
  constructor(private readonly tokenHandler: TokenHandler) {}

  async handle(request: any): Promise<void | HttpResponse> {
    const authHeader = request?.headers?.authorization;

    if (!authHeader) {
      return badRequest(new Error("No token provided"));
    }

    const authHeaderData = authHeader.split(" ");

    if (authHeaderData.length !== 2) {
      return badRequest(new Error("Badly formatted token"));
    }

    const [scheme, token] = authHeaderData;
    if (scheme !== "Bearer") {
      return badRequest(new Error("Badly formatted token"));
    }

    const validToken = this.tokenHandler.validate({ token });
    if (!validToken) {
      return unauthorized();
    }
  }
}
