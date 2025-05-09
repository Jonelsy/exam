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
exports.PaginationDto = exports.CreateClassExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateClassExamDto {
}
exports.CreateClassExamDto = CreateClassExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "classId", example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClassExamDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "examId", example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClassExamDto.prototype, "examId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "teacherId", example: 8 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClassExamDto.prototype, "teacherId", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "page", example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "page不能为空" }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "pageSize", example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "pageSize不能为空" }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "teacherId", example: 8 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: "teacherId不能为空" }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "teacherId", void 0);
//# sourceMappingURL=create-classExam.dto.js.map