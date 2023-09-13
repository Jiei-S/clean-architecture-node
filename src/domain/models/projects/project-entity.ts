import { ProjectNameVO, ProjectStatusVO } from "./project-vo";

export class Project {
  private readonly _id: string;
  private _name: ProjectNameVO;
  private _status: ProjectStatusVO;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    name,
    status,
  }: {
    id?: string;
    name: string;
    status: string;
  }) {
    this._id = id ?? "";
    this._name = new ProjectNameVO(name);
    this._status = new ProjectStatusVO(status);
  }

  get id(): string {
    return this._id;
  }

  get name(): ProjectNameVO {
    return this._name;
  }

  get status(): ProjectStatusVO {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set name(name: ProjectNameVO) {
    this._name = name;
  }

  set status(status: ProjectStatusVO) {
    this._status = status;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
}
