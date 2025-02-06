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
exports.UpdateClassDto = exports.CreateClassDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateClassDto {
}
exports.CreateClassDto = CreateClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "班级名称", example: "计科三班" }),
    (0, class_validator_1.IsNotEmpty)({ message: "班级名称不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClassDto.prototype, "className", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "所属老师", example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: "所属老师不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], CreateClassDto.prototype, "teacherId", void 0);
class UpdateClassDto {
}
exports.UpdateClassDto = UpdateClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "班级名称", example: "计科三班" }),
    (0, class_validator_1.IsNotEmpty)({ message: "班级名称不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClassDto.prototype, "className", void 0);
//# sourceMappingURL=class.dto.js.map