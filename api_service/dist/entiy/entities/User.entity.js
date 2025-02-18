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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "user_id", comment: "用户ID" }),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "openid",
        unique: false,
        comment: "微信openid",
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "openid", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", comment: "用户姓名", length: 50 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "username", comment: "昵称", length: 50 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", {
        name: "role",
        comment: "角色（0学生 1教师）",
        width: 1,
        default: () => 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "class_id", nullable: true, comment: "所属班级ID" }),
    __metadata("design:type", Number)
], User.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", {
        name: "create_time",
        nullable: true,
        comment: "创建时间",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "password",
        comment: "密码",
        length: 255,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "teacher_id", nullable: true, comment: "所属教师ID" }),
    __metadata("design:type", Number)
], User.prototype, "teacherId", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user", { schema: "exam" })
], User);
//# sourceMappingURL=User.entity.js.map