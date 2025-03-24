"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const student_controller_1 = require("./student.controller");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../entiy/entities/User.entity");
const UserClass_entity_1 = require("../entiy/entities/UserClass.entity");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../auth/jwt.strategy");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            typeorm_1.TypeOrmModule.forFeature([User_entity_1.User, UserClass_entity_1.UserClass, ClassExam_entity_1.ClassExam, Exam_entity_1.Exam]),
        ],
        providers: [student_service_1.StudentService, jwt_strategy_1.JwtStrategy],
        controllers: [student_controller_1.StudentController],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map