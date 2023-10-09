import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Project } from "../../../../../domain/models/projects/project-entity";
import { ProjectNameVO, ProjectStatusVO } from "../../../../../domain/models/projects/project-vo";
import { MaxLength, validate, IsIn } from "class-validator";
import { ApplicationError, ApplicationErrorCode } from "../../../../../middlewares/error/error";

@Entity({ name: "projects" })
export class ProjectMapper {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @MaxLength(ProjectNameVO.MAX_LENGTH, {
    message: "name is too long",
  })
  @Column()
  name: string;

  @IsIn(ProjectStatusVO.getIntValues())
  @Column({ default: ProjectStatusVO.getDefaultIntValue() })
  status: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  constructor(name: string, status: number) {
    this.name = name;
    this.status = status;
  }

  toEntity(): Project {
    const e = new Project({
      id: this.id,
      name: this.name,
      status: ProjectStatusVO.fromInt(this.status),
    });
    e.createdAt = this.createdAt;
    e.updatedAt = this.updatedAt;
    return e;
  }

  static fromEntity(entity: Project): ProjectMapper {
    const m = new ProjectMapper(entity.name.value, entity.status.toInt());
    if (entity.id) m.id = entity.id;
    return m;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    for (const error of await validate(this)) {
      throw new ApplicationError({
        message: error.toString(),
        type: "invalidProject",
        code: ApplicationErrorCode.UNPROCESSABLE_ENTITY,
      });
    }
  }
}
