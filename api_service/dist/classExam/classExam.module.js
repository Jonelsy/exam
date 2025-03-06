"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassExamModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Class_entity_1 = require("../entiy/entities/Class.entity");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
const classExam_service_1 = require("./classExam.service");
const classExam_controller_1 = require("./classExam.controller");
let ClassExamModule = class ClassExamModule {
};
exports.ClassExamModule = ClassExamModule;
exports.ClassExamModule = ClassExamModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ClassExam_entity_1.ClassExam, Class_entity_1.Class, Exam_entity_1.Exam])],
        controllers: [classExam_controller_1.ClassExamController],
        providers: [classExam_service_1.ClassExamService],
    })
], ClassExamModule);
//# sourceMappingURL=classExam.module.js.map