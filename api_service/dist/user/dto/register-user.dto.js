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
exports.getStudentDto = exports.ChangePasswordDto = exports.UpdateUserDto = exports.LoginUserDto = exports.RegisterUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class RegisterUserDto {
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "用户名", example: "john_doe" }),
    (0, class_validator_1.IsNotEmpty)({ message: "用户名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "密码", example: "1234567" }),
    (0, class_validator_1.IsNotEmpty)({ message: "密码不能为空" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "密码长度不能小于6位" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "姓名", example: "何小雨" }),
    (0, class_validator_1.IsNotEmpty)({ message: "姓名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "openid", example: "0" }),
    (0, class_validator_1.IsNotEmpty)({ message: "openid不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "openid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "classId", example: 0 }),
    (0, class_validator_1.IsNotEmpty)({ message: "classId不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegisterUserDto.prototype, "classId", void 0);
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "用户名", example: "john_doe" }),
    (0, class_validator_1.IsNotEmpty)({ message: "用户名不能为空" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "username", void 0);
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
class ChangePasswordDto {
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "旧密码", example: "1234567" }),
    (0, class_validator_1.IsNotEmpty)({ message: "旧密码不能为空" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "旧密码长度不能小于6位" }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "新密码", example: "1234567" }),
    (0, class_validator_1.IsNotEmpty)({ message: "新密码不能为空" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: "新密码长度不能小于6位" }),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
class getStudentDto {
}
exports.getStudentDto = getStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "page", example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: "cpage不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStudentDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "pageSize", example: 10 }),
    (0, class_validator_1.IsNotEmpty)({ message: "pageSize不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStudentDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "classId", example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: "classId不能为空" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], getStudentDto.prototype, "classId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "search", example: "" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], getStudentDto.prototype, "search", void 0);
//# sourceMappingURL=register-user.dto.js.map