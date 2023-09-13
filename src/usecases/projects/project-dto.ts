import { Project } from "../../domain/models/projects/project-entity";

export class ProjectDTO {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ name, status }: { name: string; status: string }) {
    this.name = name;
    this.status = status;
  }

  toEntity(): Project {
    return new Project({
      name: this.name,
      status: this.status,
    });
  }

  static fromEntity(entity: Project): ProjectDTO {
    const dto = new ProjectDTO({
      name: entity.name.value,
      status: entity.status.value.toString(),
    });
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
