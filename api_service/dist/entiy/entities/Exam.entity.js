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
exports.Exam = void 0;
const typeorm_1 = require("typeorm");
let Exam = class Exam {
};
exports.Exam = Exam;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "exam_id", comment: "考试ID" }),
    __metadata("design:type", Number)
], Exam.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "exam_name", comment: "考试名称", length: 100 }),
    __metadata("design:type", String)
], Exam.prototype, "examName", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "description", nullable: true, comment: "考试描述" }),
    __metadata("design:type", String)
], Exam.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "start_time", comment: "开始时间" }),
    __metadata("design:type", Date)
], Exam.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "end_time", comment: "结束时间" }),
    __metadata("design:type", Date)
], Exam.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "duration", comment: "考试时长(分钟)" }),
    __metadata("design:type", Number)
], Exam.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "total_score", comment: "考试总分" }),
    __metadata("design:type", Number)
], Exam.prototype, "totalScore", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "is_limit",
        comment: "是否限制次数",
        width: 1,
        default: () => "'0'",
    }),
    __metadata("design:type", Boolean)
], Exam.prototype, "isLimit", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "allow_times",
        nullable: true,
        comment: "允许考试次数",
        default: () => "'1'",
    }),
    __metadata("design:type", Number)
], Exam.prototype, "allowTimes", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", {
        name: "create_time",
        nullable: true,
        comment: "创建时间",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Exam.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "teacher_id",
        nullable: true,
        comment: "考试创建人ID",
    }),
    __metadata("design:type", Number)
], Exam.prototype, "teacherId", void 0);
exports.Exam = Exam = __decorate([
    (0, typeorm_1.Entity)("exam", { schema: "exam" })
], Exam);
//# sourceMappingURL=Exam.entity.js.map