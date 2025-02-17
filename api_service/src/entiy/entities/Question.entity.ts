import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("exam_id", ["examId"], {})
@Entity("question", { schema: "exam" })
export class Question {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "question_id",
    comment: "题目ID",
  })
  questionId: number;

  @Column("int", { name: "exam_id", comment: "所属考试ID" })
  examId: number;

  @Column("text", { name: "content", comment: "题目内容" })
  content: string;

  @Column("int", {
    name: "question_type",
    comment: "题型（0单选 1多选 2判断）",
    width: 11,
  })
  questionType: number;

  @Column("int", { name: "score", comment: "题目分值" })
  score: number;

  @Column("int", { name: "order_num", comment: "题目顺序" })
  orderNum: number;
}
