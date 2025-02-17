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
exports.UpdateQuestionDto = exports.CreateQuestionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateQuestionDto {
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "题目内容",
        example: "‌JavaScript中，以下哪个方法用于获取页面中所有<p>标签的元素？",
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "题目不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "题型（0单选 1多选 2判断 3简答）",
        example: 0,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "题型不能为空" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "所属考试ID",
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "所属考试ID不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "本题分数",
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "分数不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "题目顺序",
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "题目顺序不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateQuestionDto.prototype, "orderNum", void 0);
class UpdateQuestionDto extends CreateQuestionDto {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
//# sourceMappingURL=question.dto.js.map