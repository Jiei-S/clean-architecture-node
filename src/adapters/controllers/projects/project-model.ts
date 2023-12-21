import { ProjectDTO } from "../../../usecases/projects/project-dto";

export class ProjectParams {
  id: string;
  name: string;
  status: string;

  constructor(params: ProjectParams) {
    this.id = params.id;
    this.name = params.name;
    this.status = params.status;
  }

  static toDTO(params: ProjectParams): ProjectDTO {
    return new ProjectDTO(params);
  }
}

export class ProjectResponse {
  id: string;
  name: string;
  status: string;

  constructor({ id, name, status }: { id: string; name: string; status: string }) {
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

export const ExampleProjectResponse: ProjectResponse = {
  id: "52907745-7672-470e-a803-a2f8feb52944",
  name: "Project1",
  status: "active",
};
