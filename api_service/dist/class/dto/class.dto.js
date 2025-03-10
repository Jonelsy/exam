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
exports.UserClassDto = exports.UpdateClassDto = exports.getClassDto = exports.CreateClassDto = void 0;
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
class getClassDto {
}
exports.getClassDto = getClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "页数", example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: "page不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getClassDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "页数", example: 10 }),
    (0, class_validator_1.IsNotEmpty)({ message: "pageSize不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getClassDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "搜索内容", example: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getClassDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "老师ID", example: 8 }),
    (0, class_validator_1.IsNotEmpty)({ message: "老师ID不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getClassDto.prototype, "teacherId", void 0);
class UpdateClassDto {
}
exports.UpdateClassDto = UpdateClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "班级名称", example: "计科三班" }),
    (0, class_validator_1.IsNotEmpty)({ message: "班级名称不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateClassDto.prototype, "className", void 0);
class UserClassDto {
}
exports.UserClassDto = UserClassDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "用户名", example: "john_doe" }),
    (0, class_validator_1.IsNotEmpty)({ message: "用户名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserClassDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "密码", example: "1234567" }),
    (0, class_validator_1.IsNotEmpty)({ message: "密码不能为空" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "密码长度不能小于6位" }),
    __metadata("design:type", String)
], UserClassDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "姓名", example: "何小雨" }),
    (0, class_validator_1.IsNotEmpty)({ message: "姓名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserClassDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "openid", example: null }),
    (0, class_validator_1.IsNotEmpty)({ message: "openid学生登陆后补齐" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserClassDto.prototype, "openid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "teacherId", example: 8 }),
    (0, class_validator_1.IsNotEmpty)({ message: "teacherId不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], UserClassDto.prototype, "teacherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "classId", example: 3 }),
    (0, class_validator_1.IsNotEmpty)({ message: "classId不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], UserClassDto.prototype, "classId", void 0);
//# sourceMappingURL=class.dto.js.map