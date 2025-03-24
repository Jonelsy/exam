import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RolesGuard } from "./auth/roles.guard";
import { ClassModule } from "./class/class.module";
import { ExamModule } from "./exam/exam.module";
import { UserModule } from "./user/user.module";
import { ClassExamModule } from "./classExam/classExam.module";
import { StudentModule } from "./student/student.module";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "exam",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: false, // 启用日志记录
    }),
    ClassModule,
    ExamModule,
    UserModule,
    ClassExamModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
