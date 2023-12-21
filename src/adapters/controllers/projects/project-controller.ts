import { Request as EXRequest } from "express";
import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags, Request, Security, Example, Put } from "tsoa";
import { inject, provideSingleton } from "../../../middlewares/inversify/util";
import { ProjectParams, ProjectResponse, ExampleProjectResponse } from "./project-model";
import { IProjectUseCase } from "../../../usecases/projects/project-interface";
import { ProjectUsecase } from "../../../usecases/projects/project-usecase";
import { APISecurity } from "../../../infrastructure/express/authentication";

@Route("projects")
@Tags("Project")
@provideSingleton(ProjectController)
export class ProjectController extends Controller {
  @inject(ProjectUsecase) private projectUsecase: IProjectUseCase;

  @Example<ProjectResponse>(ExampleProjectResponse)
  @Post()
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return a project")
  public async createProject(@Request() _: EXRequest, @Body() params: ProjectParams): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.createProject(ProjectParams.toDTO(params)));
  }

  @Example<ProjectResponse>(ExampleProjectResponse)
  @Put("{id}")
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return a project")
  public async updateProject(@Request() _: EXRequest, @Body() params: ProjectParams): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.updateProject(ProjectParams.toDTO(params)));
  }

  @Example<ProjectResponse>(ExampleProjectResponse)
  @Get("{id}")
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return a project")
  public async findProject(@Request() _: EXRequest, @Path() id: string): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.findProject(id));
  }

  @Example<ProjectResponse[]>([ExampleProjectResponse])
  @Get()
  @Security(APISecurity.AUTH0_USER)
  @SuccessResponse("200", "Return projects")
  public async getProjects(): Promise<ProjectResponse[]> {
    const result = await this.projectUsecase.getProjects();
    return result.map((project) => ProjectResponse.fromDTO(project));
  }
}
