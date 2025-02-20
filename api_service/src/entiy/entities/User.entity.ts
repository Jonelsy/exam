import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "exam" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", comment: "用户ID" })
  userId: number;

  @Column("varchar", {
    name: "openid",
    unique: false,
    comment: "微信openid",
    nullable: true,
    length: 50,
  })
  openid: string | null;

  @Column("varchar", { name: "name", comment: "用户姓名", length: 50 })
  name: string;

  @Column("varchar", { name: "username", comment: "昵称", length: 50 })
  username: string;

  @Column("tinyint", {
    name: "role",
    comment: "角色（0学生 1教师）",
    width: 1,
    default: () => 0,
  })
  role: number;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date | null;

  @Column("varchar", {
    name: "password",
    comment: "密码",
    length: 255,
    select: false,
  })
  password: string;
}
