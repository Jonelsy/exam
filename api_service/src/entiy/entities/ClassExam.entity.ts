import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("exam_id", ["examId"], {})
@Index("uk_class_exam", ["classId", "examId"], { unique: true })
@Entity("class_exam", { schema: "exam" })
export class ClassExam {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "关联ID" })
  id: number;

  @Column("int", { name: "class_id", comment: "班级ID" })
  classId: number;

  @Column("int", { name: "exam_id", comment: "考试ID" })
  examId: number;
}
