import { Project } from "./project-entity";

export interface IProjectRepository {
  save(project: Project): Promise<Project>;
  find(id: string): Promise<Project>;
}
