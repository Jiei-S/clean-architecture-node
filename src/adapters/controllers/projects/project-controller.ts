import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { inject, provideSingleton } from "../../../middlewares/inversify/util";
import { ProjectCreateParams, ProjectResponse } from "./project-model";
import { IProjectUseCase } from "../../../usecases/projects/project-interface";
import { ProjectUsecase } from "../../../usecases/projects/project-usecase";

@Route("projects")
@Tags("Project")
@provideSingleton(ProjectController)
export class ProjectController extends Controller {
  @inject(ProjectUsecase) private projectUsecase: IProjectUseCase;

  @Post()
  @SuccessResponse("200", "Return a project")
  public async createProject(@Body() params: ProjectCreateParams): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.createProject(ProjectCreateParams.toDTO(params)));
  }

  @Get("{id}")
  @SuccessResponse("200", "Return a project")
  public async findProject(@Path() id: string): Promise<ProjectResponse> {
    return ProjectResponse.fromDTO(await this.projectUsecase.findProject(id));
  }
}
