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
exports.CreateExamRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamRecordDto {
}
exports.CreateExamRecordDto = CreateExamRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "用户ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateExamRecordDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "考试ID" }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateExamRecordDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "考试成绩", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateExamRecordDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "开始时间" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateExamRecordDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "结束时间" }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateExamRecordDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "是否通过", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateExamRecordDto.prototype, "isPassed", void 0);
//# sourceMappingURL=exam-record.dto.js.map