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
exports.Option = void 0;
const typeorm_1 = require("typeorm");
let Option = class Option {
};
exports.Option = Option;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "option_id", comment: "选项ID" }),
    __metadata("design:type", Number)
], Option.prototype, "optionId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "question_id", comment: "题目ID" }),
    __metadata("design:type", Number)
], Option.prototype, "questionId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "exam_id", comment: "所属考试ID" }),
    __metadata("design:type", Number)
], Option.prototype, "examId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "content", comment: "选项内容", length: 255 }),
    __metadata("design:type", String)
], Option.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "is_correct",
        comment: "是否正确答案",
        width: 1,
        default: () => "'0'",
    }),
    __metadata("design:type", Boolean)
], Option.prototype, "isCorrect", void 0);
exports.Option = Option = __decorate([
    (0, typeorm_1.Index)("question_id", ["questionId"], {}),
    (0, typeorm_1.Entity)("option", { schema: "exam" })
], Option);
//# sourceMappingURL=Option.entity.js.map