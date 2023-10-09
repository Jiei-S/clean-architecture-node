import { IProjectRepository } from "../../../../../domain/models/projects/project-repository-interface";
import { Project } from "../../../../../domain/models/projects/project-entity";
import { provideSingleton } from "../../../../../middlewares/inversify/util";
import { ProjectMapper } from "./project-mapper";
import { TypeORMError } from "typeorm";
import dataSource from "../../../../../infrastructure/typeorm/connection";
import { ApplicationError } from "../../../../../middlewares/error/error";

@provideSingleton(ProjectRepository)
export class ProjectRepository implements IProjectRepository {
  private repository = dataSource.getRepository(ProjectMapper);

  async save(project: Project): Promise<Project> {
    const result = await this.repository.save(ProjectMapper.fromEntity(project));
    return result.toEntity();
  }

  async find(id: string): Promise<Project> {
    const result = await this.repository.findOneByOrFail({ id }).catch((err: TypeORMError) => {
      throw ApplicationError.fromORMError(err);
    });
    return result.toEntity();
  }

  async get(): Promise<Project[]> {
    const result = await this.repository.find();
    return result.map((project) => project.toEntity());
  }
}
