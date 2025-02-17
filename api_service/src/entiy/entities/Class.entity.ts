import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_class_teacher", ["teacherId"], {})
@Entity("class", { schema: "exam" })
export class Class {
  @PrimaryGeneratedColumn({ type: "int", name: "class_id", comment: "班级ID" })
  classId: number;

  @Column("varchar", { name: "class_name", comment: "班级名称", length: 50 })
  className: string;

  @Column("int", { name: "teacher_id", comment: "班主任ID" })
  teacherId: number;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;
}
