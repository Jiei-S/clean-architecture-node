import { Request as EXRequest } from "express";
import { Controller, Get, Path, Route, SuccessResponse, Tags, Request, Security } from "tsoa";
import { inject, provideSingleton } from "../../../middlewares/inversify/util";
import { ProjectResponse } from "../projects/project-model";
import { IProjectUseCase } from "../../../usecases/projects/project-interface";
import { ProjectUsecase } from "../../../usecases/projects/project-usecase";
import { APISecurity } from "../../../infrastructure/express/authentication";

@Route("public/projects")
@Tags("project-public")
@provideSingleton(PublicProjectController)
export class PublicProjectController extends Controller {
  @inject(ProjectUsecase) private projectUsecase: IProjectUseCase;

  @Get("{id}")
  @Security(APISecurity.API_KEY)
  @SuccessResponse("200", "Return a project")
  public async findProjectForPublic(@Request() _: EXRequest, @Path() id: string): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.findProject(id));
  }

  @Get()
  @Security(APISecurity.API_KEY)
  @SuccessResponse("200", "Return projects")
  public async getProjectsForPublic(): Promise<ProjectResponse[]> {
    const result = await this.projectUsecase.getProjects();
    return result.map((project) => ProjectResponse.fromDTO(project));
  }
}
