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
exports.ExamRecord = void 0;
const typeorm_1 = require("typeorm");
let ExamRecord = class ExamRecord {
};
exports.ExamRecord = ExamRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "record_id", comment: "记录ID" }),
    __metadata("design:type", Number)
], ExamRecord.prototype, "recordId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "user_id", comment: "用户ID" }),
    __metadata("design:type", Number)
], ExamRecord.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "exam_id", comment: "考试ID" }),
    __metadata("design:type", Number)
], ExamRecord.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "score", nullable: true, comment: "考试成绩" }),
    __metadata("design:type", Number)
], ExamRecord.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "start_time", comment: "开始时间" }),
    __metadata("design:type", Date)
], ExamRecord.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "end_time", comment: "结束时间" }),
    __metadata("design:type", Date)
], ExamRecord.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "is_passed",
        nullable: true,
        comment: "是否通过",
        width: 1,
    }),
    __metadata("design:type", Boolean)
], ExamRecord.prototype, "isPassed", void 0);
exports.ExamRecord = ExamRecord = __decorate([
    (0, typeorm_1.Index)("exam_id", ["examId"], {}),
    (0, typeorm_1.Index)("user_id", ["userId"], {}),
    (0, typeorm_1.Entity)("exam_record", { schema: "exam" })
], ExamRecord);
//# sourceMappingURL=ExamRecord.entity.js.map