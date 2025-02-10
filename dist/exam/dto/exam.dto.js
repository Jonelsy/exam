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
exports.findExamDto = exports.CreateExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamDto {
}
exports.CreateExamDto = CreateExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "考试名称", example: "计算机组成原理" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "考试名称不能为空" }),
    __metadata("design:type", String)
], CreateExamDto.prototype, "examName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "考试描述",
        example: "探索计算机的奥秘，深入微观世界",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "开始时间", example: new Date() }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "开始时间不能为空" }),
    __metadata("design:type", Date)
], CreateExamDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "结束时间", example: new Date() }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "结束时间不能为空" }),
    __metadata("design:type", Date)
], CreateExamDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "考试时长(分钟)", example: 120 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "考试时长不能为空" }),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "总分", example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "总分不能为空" }),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "totalScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "是否限制次数", example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "是否限制次数不能为空" }),
    __metadata("design:type", Boolean)
], CreateExamDto.prototype, "isLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "允许考试次数", example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "允许考试次数不能为空" }),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "allowTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "老师ID", example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "老师ID不能为空" }),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "teacherId", void 0);
class findExamDto {
}
exports.findExamDto = findExamDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Teacher ID", example: "123" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], findExamDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Class ID", example: "456" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], findExamDto.prototype, "classId", void 0);
//# sourceMappingURL=exam.dto.js.map