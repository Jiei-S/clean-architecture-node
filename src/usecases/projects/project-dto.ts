import { Project } from "../../domain/models/projects/project-entity";

export class ProjectDTO {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(params: { id: string; name: string; status: string }) {
    this.id = params.id;
    this.name = params.name;
    this.status = params.status;
  }

  toEntity(): Project {
    return new Project({
      id: this.id,
      name: this.name,
      status: this.status,
    });
  }

  static fromEntity(entity: Project): ProjectDTO {
    const dto = new ProjectDTO({
      id: entity.id,
      name: entity.name.value,
      status: entity.status.value.toString(),
    });
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
