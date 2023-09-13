import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "../../../../../domain/models/projects/project-entity";
import { ProjectStatusVO } from "../../../../../domain/models/projects/project-vo";

@Entity({ name: "projects" })
export class ProjectMapper {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
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
}
