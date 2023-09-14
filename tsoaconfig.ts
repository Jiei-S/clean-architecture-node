import { generateRoutes, generateSpec, ExtendedRoutesConfig, ExtendedSpecConfig } from "tsoa";

(async () => {
  const specOptions: ExtendedSpecConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    outputDirectory: "src/infrastructure/express",
    specVersion: 3,
    version: "1.0.0",
    controllerPathGlobs: ["src/adapters/controllers/**/*.ts"],
    name: "API",
    host: "localhost:4000",
    schemes: ["http"],
    basePath: "/",
    specFileBaseName: "swagger",
  };

  const routeOptions: ExtendedRoutesConfig = {
    entryFile: "src/index.ts",
    noImplicitAdditionalProperties: "throw-on-extras",
    routesDir: "src/infrastructure/express",
    controllerPathGlobs: ["src/adapters/controllers/**/*.ts"],
    authenticationModule: "src/infrastructure/express/authentication.ts",
    iocModule: "src/middlewares/inversify/ioc.ts",
  };

  await Promise.all([generateSpec(specOptions), generateRoutes(routeOptions)]);
})();
