import { Column, Entity, Index } from "typeorm";

@Index("answer_id", ["answerId"], {})
@Entity("submission_answers", { schema: "exam" })
export class SubmissionAnswers {
  @Column("int", { primary: true, generated: "increment", name: "answer_id" })
  answerId: number;

  @Column("int", { name: "question_id" })
  questionId: number;

  @Column("int", { name: "exam_id" })
  examId: number;

  @Column("tinyint", { name: "question_type" }) // 数据库是 tinyint(4)
  questionType: number;

  @Column("varchar", { name: "option_ids", length: 255, nullable: true })
  optionIds: string;

  @Column("varchar", { name: "answer_content", length: 255, nullable: true })
  answerContent: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
