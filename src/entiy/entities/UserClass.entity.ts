import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("class_id", ["classId"], {})
@Index("uk_user_class", ["userId", "classId"], { unique: true })
@Entity("user_class", { schema: "exam" })
export class UserClass {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "关联ID" })
  id: number;

  @Column("int", { name: "user_id", comment: "用户ID" })
  userId: number;

  @Column("int", { name: "class_id", comment: "班级ID" })
  classId: number;
}
