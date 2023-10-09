import { Request as EXRequest } from "express";
import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags, Request, Security } from "tsoa";
import { inject, provideSingleton } from "../../../middlewares/inversify/util";
import { ProjectCreateParams, ProjectResponse } from "./project-model";
import { IProjectUseCase } from "../../../usecases/projects/project-interface";
import { ProjectUsecase } from "../../../usecases/projects/project-usecase";
import { APISecurity } from "../../../infrastructure/express/authentication";

@Route("projects")
@Tags("Project")
@provideSingleton(ProjectController)
export class ProjectController extends Controller {
  @inject(ProjectUsecase) private projectUsecase: IProjectUseCase;

  @Post()
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return a project")
  public async createProject(@Request() _: EXRequest, @Body() params: ProjectCreateParams): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.createProject(ProjectCreateParams.toDTO(params)));
  }

  @Get("{id}")
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return a project")
  public async findProject(@Request() _: EXRequest, @Path() id: string): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.findProject(id));
  }
}