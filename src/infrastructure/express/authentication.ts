import { Request } from "express";

export enum APISecurity {
  AUTH0_USER = "AUTH0_USER",
}

export async function expressAuthentication(request: Request, securityName: string, scopes: string[]): Promise<void> {
  if (securityName === APISecurity.AUTH0_USER) {
    console.log("Allow access");
    console.log("scopes", scopes);
  }
}
