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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../entiy/entities/User.entity");
const UserClass_entity_1 = require("../entiy/entities/UserClass.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, userClassRepository, jwtService) {
        this.userRepository = userRepository;
        this.userClassRepository = userClassRepository;
        this.jwtService = jwtService;
    }
    async register(registerUserDto) {
        const { username, password, name, openid, classId } = registerUserDto;
        const existUser = await this.userRepository.findOne({
            where: { username },
        });
        if (existUser) {
            throw new common_1.HttpException("用户已存在", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            name,
            role: 0,
            openid,
            createTime: new Date(),
        });
        const savedUser = await this.userRepository.save(user);
        const userClass = this.userClassRepository.create({
            userId: savedUser.userId,
            classId: classId,
        });
        await this.userClassRepository.save(userClass);
        return {
            item: savedUser,
        };
    }
    async login(username, password, openid) {
        const user = await this.userRepository.findOne({
            where: { username },
            select: ["userId", "username", "name", "role", "password", "openid"],
        });
        if (!user) {
            throw new common_1.HttpException("用户不存在", common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException("密码错误", common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.openid && openid) {
            user.openid = openid;
            await this.userRepository.save(user);
        }
        const payload = {
            username: user.username,
            userId: user.userId,
            role: user.role,
            openid: user.openid,
            name: user.name,
        };
        const token = this.jwtService.sign(payload);
        return { token, payload, code: 200 };
    }
    async findAll(item) {
        const query = this.userRepository
            .createQueryBuilder("user")
            .skip((item.page - 1) * item.pageSize)
            .take(item.pageSize);
        query.where({ role: 0 });
        if (item.classId) {
            const userIds = await this.userClassRepository
                .createQueryBuilder("userClass")
                .select("userClass.userId")
                .where("userClass.classId = :classId", { classId: item.classId })
                .getRawMany();
            const ids = userIds.map((uc) => uc.userClass_user_id);
            if (ids.length > 0) {
                query.andWhere("user.userId IN (:...ids)", { ids });
            }
            else {
                throw new common_1.HttpException("该班级没有学生", common_1.HttpStatus.OK);
            }
        }
        if (item.search) {
            query.andWhere("(user.name LIKE :search OR user.username LIKE :search)", {
                search: `%${item.search}%`,
            });
        }
        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { userId: id } });
        if (!user) {
            throw new common_1.HttpException("用户不存在", common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        const updatedUser = Object.assign(user, updateUserDto);
        return this.userRepository.save(updatedUser);
    }
    async remove(id) {
        const user = await this.findOne(id);
        const userClass = await this.userClassRepository.findOne({
            where: { userId: id },
        });
        await this.userRepository.remove(user);
        await this.userClassRepository.remove(userClass);
        return { message: "用户删除成功" };
    }
    async changePassword(id, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { userId: id },
            select: ["userId", "password"],
        });
        if (!user) {
            throw new common_1.HttpException("用户不存在", common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException("旧密码错误", common_1.HttpStatus.UNAUTHORIZED);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return { message: "密码修改成功" };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(UserClass_entity_1.UserClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map