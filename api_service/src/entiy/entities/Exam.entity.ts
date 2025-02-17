import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("exam", { schema: "exam" })
export class Exam {
  @PrimaryGeneratedColumn({ type: "int", name: "exam_id", comment: "考试ID" })
  examId: number;

  @Column("varchar", { name: "exam_name", comment: "考试名称", length: 100 })
  examName: string;

  @Column("text", { name: "description", nullable: true, comment: "考试描述" })
  description: string | null;

  @Column("datetime", { name: "start_time", comment: "开始时间" })
  startTime: Date;

  @Column("datetime", { name: "end_time", comment: "结束时间" })
  endTime: Date;

  @Column("int", { name: "duration", comment: "考试时长(分钟)" })
  duration: number;

  @Column("int", { name: "total_score", comment: "考试总分" })
  totalScore: number;

  @Column("tinyint", {
    name: "is_limit",
    comment: "是否限制次数",
    width: 1,
    default: () => "'0'",
  })
  isLimit: boolean;

  @Column("int", {
    name: "allow_times",
    nullable: true,
    comment: "允许考试次数",
    default: () => "'1'",
  })
  allowTimes: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;

  @Column("int", {
    name: "teacher_id",
    nullable: true,
    comment: "考试创建人ID",
  })
  teacherId: number | null;
}
