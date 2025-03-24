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
exports.UpdateUserDto = exports.LoginUserDto = exports.getStuExamListDto = void 0;
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
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "classId", example: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: "classId不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LoginUserDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "openid", example: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "openid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "密码", example: "1234567" }),
    (0, class_validator_1.IsNotEmpty)({ message: "密码不能为空" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "密码长度不能小于6位" }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "用户名", example: "john_doe" }),
    (0, class_validator_1.IsNotEmpty)({ message: "用户名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "姓名", example: "何小雨" }),
    (0, class_validator_1.IsNotEmpty)({ message: "姓名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "班级", example: 0 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "classId", void 0);
//# sourceMappingURL=register-student.dto.js.map