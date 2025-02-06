import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("exam_id", ["examId"], {})
@Index("user_id", ["userId"], {})
@Entity("exam_record", { schema: "exam" })
export class ExamRecord {
  @PrimaryGeneratedColumn({ type: "int", name: "record_id", comment: "记录ID" })
  recordId: number;

  @Column("int", { name: "user_id", comment: "用户ID" })
  userId: number;

  @Column("int", { name: "exam_id", comment: "考试ID" })
  examId: number;

  @Column("int", { name: "score", nullable: true, comment: "考试成绩" })
  score: number | null;

  @Column("datetime", { name: "start_time", comment: "开始时间" })
  startTime: Date;

  @Column("datetime", { name: "end_time", comment: "结束时间" })
  endTime: Date;

  @Column("tinyint", {
    name: "is_passed",
    nullable: true,
    comment: "是否通过",
    width: 1,
  })
  isPassed: boolean | null;
}
