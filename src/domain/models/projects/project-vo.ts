import { ApplicationError, ApplicationErrorCode } from "../../../middlewares/error/error";

// Name
const MAX_PROJECT_NAME_LENGTH = 50;

export class ProjectNameVO {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw this.newError();
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  private validate(value: string): boolean {
    return value.length <= MAX_PROJECT_NAME_LENGTH;
  }

  newError(): ApplicationError {
    return new ApplicationError({
      message: `Project name is invalid`,
      type: "invalidName",
      code: ApplicationErrorCode.UNPROCESSABLE_ENTITY,
    });
  }
}

// Status
const ProjectStatusTodo = "todo";
const ProjectStatusRunning = "running";
const ProjectStatusCompleted = "completed";

type ProjectStatus = typeof ProjectStatusTodo | typeof ProjectStatusRunning | typeof ProjectStatusCompleted;

const ProjectStatusMap: ReadonlyMap<ProjectStatus, number> = new Map([
  [ProjectStatusTodo, 1],
  [ProjectStatusRunning, 2],
  [ProjectStatusCompleted, 3],
]);

export class ProjectStatusVO {
  private readonly _value: ProjectStatus;

  constructor(value: string) {
    if (!this.validate(value)) throw this.newError();
    this._value = value as ProjectStatus;
  }

  get value(): ProjectStatus {
    return this._value;
  }

  private validate(value: string): boolean {
    for (const [k] of ProjectStatusMap) {
      if (k === value) return true;
    }
    return false;
  }

  isTodo(): boolean {
    return this._value === ProjectStatusTodo;
  }

  isRunning(): boolean {
    return this._value === ProjectStatusRunning;
  }

  isCompleted(): boolean {
    return this._value === ProjectStatusCompleted;
  }

  toInt(): number {
    return ProjectStatusMap.get(this._value) as number;
  }

  static fromInt(status: number): ProjectStatus {
    for (const [k, v] of ProjectStatusMap) {
      if (v === status) return k;
    }
    throw ProjectStatusVO.prototype.newError();
  }

  newError(): ApplicationError {
    return new ApplicationError({
      message: `Project status is invalid`,
      type: "invalidStatus",
      code: ApplicationErrorCode.UNPROCESSABLE_ENTITY,
    });
  }
}
