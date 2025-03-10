"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassExam = void 0;
const typeorm_1 = require("typeorm");
let ClassExam = class ClassExam {
};
exports.ClassExam = ClassExam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id", comment: "关联ID" }),
    __metadata("design:type", Number)
], ClassExam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "class_id", comment: "班级ID" }),
    __metadata("design:type", Number)
], ClassExam.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "exam_id", comment: "考试ID" }),
    __metadata("design:type", Number)
], ClassExam.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "teacher_id", comment: "老师ID" }),
    __metadata("design:type", Number)
], ClassExam.prototype, "teacherId", void 0);
exports.ClassExam = ClassExam = __decorate([
    (0, typeorm_1.Index)("exam_id", ["examId"], {}),
    (0, typeorm_1.Index)("uk_class_exam", ["classId", "examId"], { unique: true }),
    (0, typeorm_1.Entity)("class_exam", { schema: "exam" })
], ClassExam);
//# sourceMappingURL=ClassExam.entity.js.map