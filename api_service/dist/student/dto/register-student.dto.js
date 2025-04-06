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
exports.subExamDto = exports.answersDto = exports.getStuExamListDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class getStuExamListDto {
}
exports.getStuExamListDto = getStuExamListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "userId", example: 17 }),
    (0, class_validator_1.IsNotEmpty)({ message: "userId不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStuExamListDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "page", example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: "page不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStuExamListDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "pageSize", example: 10 }),
    (0, class_validator_1.IsNotEmpty)({ message: "pageSize不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStuExamListDto.prototype, "pageSize", void 0);
class answersDto {
}
exports.answersDto = answersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "选项ID", example: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: "选项ID不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], answersDto.prototype, "optionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "题目ID", example: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: "题目ID不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], answersDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "题目类型", example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], answersDto.prototype, "questionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "多选题答案", example: [0, 1, 2] }),
    __metadata("design:type", Array)
], answersDto.prototype, "optionIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "简答题答案", example: "123" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], answersDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "判断题答案", example: 1 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], answersDto.prototype, "userAnswer", void 0);
class subExamDto {
}
exports.subExamDto = subExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "answers", example: [] }),
    __metadata("design:type", Array)
], subExamDto.prototype, "answers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "examId", example: 17 }),
    (0, class_validator_1.IsNotEmpty)({ message: "examId不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], subExamDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "提交时间" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], subExamDto.prototype, "submitTime", void 0);
//# sourceMappingURL=register-student.dto.js.map