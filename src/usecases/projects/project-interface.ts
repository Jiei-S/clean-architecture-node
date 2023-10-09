import { ProjectDTO } from "./project-dto";

export interface IProjectUseCase {
  createProject(project: ProjectDTO): Promise<ProjectDTO>;
  findProject(id: string): Promise<ProjectDTO>;
  getProjects(): Promise<ProjectDTO[]>;
}
