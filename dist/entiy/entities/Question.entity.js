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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
let Question = class Question {
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "int",
        name: "question_id",
        comment: "题目ID",
    }),
    __metadata("design:type", Number)
], Question.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "exam_id", comment: "所属考试ID" }),
    __metadata("design:type", Number)
], Question.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "content", comment: "题目内容" }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("int", {
        name: "question_type",
        comment: "题型（0单选 1多选 2判断）",
        width: 11,
    }),
    __metadata("design:type", Number)
], Question.prototype, "questionType", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "score", comment: "题目分值" }),
    __metadata("design:type", Number)
], Question.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "order_num", comment: "题目顺序" }),
    __metadata("design:type", Number)
], Question.prototype, "orderNum", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Index)("exam_id", ["examId"], {}),
    (0, typeorm_1.Entity)("question", { schema: "exam" })
], Question);
//# sourceMappingURL=Question.entity.js.map