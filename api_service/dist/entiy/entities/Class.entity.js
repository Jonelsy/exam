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
exports.Class = void 0;
const typeorm_1 = require("typeorm");
let Class = class Class {
};
exports.Class = Class;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "class_id", comment: "班级ID" }),
    __metadata("design:type", Number)
], Class.prototype, "classId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "class_name", comment: "班级名称", length: 50 }),
    __metadata("design:type", String)
], Class.prototype, "className", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "teacher_id", comment: "班主任ID" }),
    __metadata("design:type", Number)
], Class.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", {
        name: "create_time",
        nullable: true,
        comment: "创建时间",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Class.prototype, "createTime", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Index)("fk_class_teacher", ["teacherId"], {}),
    (0, typeorm_1.Entity)("class", { schema: "exam" })
], Class);
//# sourceMappingURL=Class.entity.js.map