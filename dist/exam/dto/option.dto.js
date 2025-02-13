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
exports.OptionResponseDto = exports.UpdateOptionDto = exports.CreateOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOptionDto {
}
exports.CreateOptionDto = CreateOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "题目ID(questionId)",
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateOptionDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "选项内容", example: "queryselectAll('p')" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOptionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "是否正确答案", default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOptionDto.prototype, "isCorrect", void 0);
class UpdateOptionDto {
}
exports.UpdateOptionDto = UpdateOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "选项内容", example: "queryselectAll('p')" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOptionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "是否正确答案", default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateOptionDto.prototype, "isCorrect", void 0);
class OptionResponseDto {
}
exports.OptionResponseDto = OptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "选项ID" }),
    __metadata("design:type", Number)
], OptionResponseDto.prototype, "optionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "题目ID" }),
    __metadata("design:type", Number)
], OptionResponseDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "选项内容" }),
    __metadata("design:type", String)
], OptionResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "是否正确答案" }),
    __metadata("design:type", Boolean)
], OptionResponseDto.prototype, "isCorrect", void 0);
//# sourceMappingURL=option.dto.js.map