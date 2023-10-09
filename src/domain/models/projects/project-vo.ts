import { ApplicationError, ApplicationErrorCode } from "../../../middlewares/error/error";

export class ProjectNameVO {
  static readonly MAX_LENGTH = 50;
  private readonly _value: string;

  constructor(value: string) {
    if (!this.validate(value)) throw this.newError();
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  private validate(value: string): boolean {
    return value.length <= ProjectNameVO.MAX_LENGTH;
  }

  newError(): ApplicationError {
    return new ApplicationError({
      message: `Project name is invalid`,
      type: "invalidName",
      code: ApplicationErrorCode.UNPROCESSABLE_ENTITY,
    });
  }
}

export class ProjectStatusVO {
  static readonly ACTIVE = "active";
  static readonly INACTIVE = "inactive";
  StatusType: typeof ProjectStatusVO.ACTIVE | typeof ProjectStatusVO.INACTIVE;
  static readonly StatusMap: ReadonlyMap<ProjectStatusVO["StatusType"], number> = new Map([
    [ProjectStatusVO.ACTIVE, 1],
    [ProjectStatusVO.INACTIVE, 2],
  ]);

  private readonly _value: ProjectStatusVO["StatusType"];

  constructor(value: string) {
    if (!this.validate(value)) throw this.newError();
    this._value = value as ProjectStatusVO["StatusType"];
  }

  get value(): ProjectStatusVO["StatusType"] {
    return this._value;
  }

  private validate(value: string): boolean {
    for (const [k] of ProjectStatusVO.StatusMap) {
      if (k === value) return true;
    }
    return false;
  }

  static getIntValues(): number[] {
    return Array.from(ProjectStatusVO.StatusMap.values());
  }

  static getDefaultIntValue(): number {
    return ProjectStatusVO.StatusMap.get(ProjectStatusVO.ACTIVE) ?? 0;
  }

  isActive(): boolean {
    return this._value === ProjectStatusVO.ACTIVE;
  }

  isInActive(): boolean {
    return this._value === ProjectStatusVO.INACTIVE;
  }

  toInt(): number {
    return ProjectStatusVO.StatusMap.get(this._value) as number;
  }

  static fromInt(status: number): ProjectStatusVO["StatusType"] {
    for (const [k, v] of ProjectStatusVO.StatusMap) {
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
