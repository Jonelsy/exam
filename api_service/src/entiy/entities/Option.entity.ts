import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("question_id", ["questionId"], {})
@Entity("option", { schema: "exam" })
export class Option {
  @PrimaryGeneratedColumn({ type: "int", name: "option_id", comment: "选项ID" })
  optionId: number;

  @Column("int", { name: "question_id", comment: "题目ID" })
  questionId: number;

  @Column("int", { name: "exam_id", comment: "所属考试ID" })
  examId: number;

  @Column("varchar", { name: "content", comment: "选项内容", length: 255 })
  content: string;

  @Column("tinyint", {
    name: "is_correct",
    comment: "是否正确答案",
    width: 1,
    default: () => "'0'",
  })
  isCorrect: boolean;
}
