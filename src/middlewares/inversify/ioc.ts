import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";
// import { DataSource, Repository } from "typeorm";

const iocContainer = new Container();

decorate(injectable(), Controller);
// decorate(injectable(), Repository);

iocContainer.load(buildProviderModule());

export { iocContainer };
