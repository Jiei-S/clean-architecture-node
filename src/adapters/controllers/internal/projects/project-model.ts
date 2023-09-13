import { ProjectDTO } from "../../../../usecases/projects/project-dto";

export class ProjectCreateParams {
  name: string;
  status: string;

  constructor({ name, status }: { name: string; status: string }) {
    this.name = name;
    this.status = status;
  }

  static toDTO({ name, status }: { name: string; status: string }): ProjectDTO {
    return new ProjectDTO({
      name,
      status,
    });
  }
}

export class ProjectResponse {
  id: string;
  name: string;
  status: string;

  constructor({
    id,
    name,
    status,
  }: {
    id: string;
    name: string;
    status: string;
  }) {
    this.id = id;
    this.name = name;
    this.status = status;
  }

  static fromDTO(dto: ProjectDTO): ProjectResponse {
    return new ProjectResponse({
      id: dto.id,
      name: dto.name,
      status: dto.status,
    });
  }
}
