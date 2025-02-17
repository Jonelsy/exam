"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamModule = void 0;
const common_1 = require("@nestjs/common");
const exam_controller_1 = require("./exam.controller");
const exam_service_1 = require("./exam.service");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Question_entity_1 = require("../entiy/entities/Question.entity");
const Option_entity_1 = require("../entiy/entities/Option.entity");
const ExamRecord_entity_1 = require("../entiy/entities/ExamRecord.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ExamModule = class ExamModule {
};
exports.ExamModule = ExamModule;
exports.ExamModule = ExamModule = __decorate([
    (0, common_1.Module)({
        controllers: [exam_controller_1.ExamController],
        providers: [exam_service_1.ExamService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Exam_entity_1.Exam, ClassExam_entity_1.ClassExam, Question_entity_1.Question, Option_entity_1.Option, ExamRecord_entity_1.ExamRecord]),
        ],
    })
], ExamModule);
//# sourceMappingURL=exam.module.js.map