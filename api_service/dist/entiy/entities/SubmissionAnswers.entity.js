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
exports.SubmissionAnswers = void 0;
const typeorm_1 = require("typeorm");
let SubmissionAnswers = class SubmissionAnswers {
};
exports.SubmissionAnswers = SubmissionAnswers;
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, generated: "increment", name: "answer_id" }),
    __metadata("design:type", Number)
], SubmissionAnswers.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "question_id" }),
    __metadata("design:type", Number)
], SubmissionAnswers.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "exam_id" }),
    __metadata("design:type", Number)
], SubmissionAnswers.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "question_type" }),
    __metadata("design:type", Number)
], SubmissionAnswers.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "option_ids", length: 255, nullable: true }),
    __metadata("design:type", String)
], SubmissionAnswers.prototype, "optionIds", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "answer_content", length: 255, nullable: true }),
    __metadata("design:type", String)
], SubmissionAnswers.prototype, "answerContent", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], SubmissionAnswers.prototype, "createdAt", void 0);
exports.SubmissionAnswers = SubmissionAnswers = __decorate([
    (0, typeorm_1.Index)("answer_id", ["answerId"], {}),
    (0, typeorm_1.Entity)("submission_answers", { schema: "exam" })
], SubmissionAnswers);
//# sourceMappingURL=SubmissionAnswers.entity.js.map