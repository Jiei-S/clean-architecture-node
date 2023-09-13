import { ProjectRepository } from "../../adapters/gateways/repositories/typeorm/projects/project-repository";
import { IProjectRepository } from "../../domain/models/projects/project-repository-interface";
import { inject, provideSingleton } from "../../middlewares/inversify/util";
import { ProjectDTO } from "./project-dto";
import { IProjectUseCase } from "./project-interface";

@provideSingleton(ProjectUsecase)
export class ProjectUsecase implements IProjectUseCase {
  constructor(
    @inject(ProjectRepository) private projectRepository: IProjectRepository
  ) {}

  async createProject(dto: ProjectDTO): Promise<ProjectDTO> {
    return ProjectDTO.fromEntity(
      await this.projectRepository.save(dto.toEntity())
    );
  }

  async findProject(id: string): Promise<ProjectDTO> {
    const project = await this.projectRepository.find(id);
    return ProjectDTO.fromEntity(project);
  }
}
