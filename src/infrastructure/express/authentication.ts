import { Request } from "express";
import { ApplicationError, ApplicationErrorCode } from "../../middlewares/error/error";

export enum APISecurity {
  AUTH0_USER = "AUTH0_USER",
  API_KEY = "API_KEY",
}

export async function expressAuthentication(request: Request, securityName: string, scopes: string[]): Promise<void> {
  console.log("scopes", scopes);

  switch (securityName) {
    case APISecurity.AUTH0_USER:
      console.log("Allow access to user");
      break;
    case APISecurity.API_KEY:
      if (request.headers["api-key"] === process.env.API_KEY) break;

      throw new ApplicationError({
        message: "Unauthorized",
        type: "UNAUTHORIZED",
        code: ApplicationErrorCode.UNAUTHENTICATED,
      });
    default:
      console.log("securityName", securityName);
      break;
  }
}
