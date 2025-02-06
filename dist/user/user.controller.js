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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const register_user_dto_1 = require("./dto/register-user.dto");
const roles_guard_1 = require("../auth/roles.guard");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(item) {
        return this.userService.register(item);
    }
    async login(item) {
        return this.userService.login(item.username, item.password);
    }
    async findAll() {
        return this.userService.findAll();
    }
    async findOne(id) {
        return this.userService.findOne(+id);
    }
    async update(id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
    async changePassword(id, changePasswordDto) {
        return this.userService.changePassword(+id, changePasswordDto.oldPassword, changePasswordDto.newPassword);
    }
    async remove(id) {
        return this.userService.remove(+id);
    }
    async getProtectedData() {
        return {
            message: "这个接口只允许role为0或1访问",
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("/register"),
    (0, swagger_1.ApiOperation)({ summary: "注册" }),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.RegisterUserDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "用户注册成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "User already exists" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("/login"),
    (0, swagger_1.ApiOperation)({ summary: "登录" }),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "用户登陆成功" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Invalid credentials" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/userList"),
    (0, swagger_1.ApiOperation)({ summary: "获取所有用户" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功获取用户列表" }),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "获取单个用户" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功获取用户信息" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "用户不存在" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiOperation)({ summary: "更新用户信息" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "用户信息更新成功" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "用户不存在" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)("/change-password/:id"),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.ChangePasswordDto }),
    (0, swagger_1.ApiOperation)({ summary: "修改用户密码" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "密码修改成功" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "旧密码不正确" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "用户不存在" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_user_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "删除用户" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "用户删除成功" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "用户不存在" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("/protected-data"),
    (0, swagger_1.ApiOperation)({ summary: "获取受保护的数据" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "成功获取受保护的数据" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProtectedData", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("用户相关管理"),
    (0, common_1.Controller)("user"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map