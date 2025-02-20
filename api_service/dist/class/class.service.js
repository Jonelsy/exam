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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Class_entity_1 = require("../entiy/entities/Class.entity");
const User_entity_1 = require("../entiy/entities/User.entity");
const UserClass_entity_1 = require("../entiy/entities/UserClass.entity");
const bcrypt = require("bcrypt");
let ClassService = class ClassService {
    constructor(classRepository, userRepository, userClassRepository) {
        this.classRepository = classRepository;
        this.userRepository = userRepository;
        this.userClassRepository = userClassRepository;
    }
    async createStudentClassRelation(teacherId, classId, userClassDto) {
        const hashedPassword = await bcrypt.hash(userClassDto.password, 10);
        const newUser = this.userRepository.create({
            ...userClassDto,
            password: hashedPassword,
            role: 0,
        });
        await this.userRepository.save(newUser);
        const userClass = this.userClassRepository.create({
            userId: newUser.userId,
            classId: classId,
        });
        await this.userClassRepository.save(userClass);
        return {
            message: "学生班级关联创建成功",
            user: newUser,
            userClass: userClass,
        };
    }
    async findAll(getClassDto) {
        const query = this.classRepository
            .createQueryBuilder("class")
            .skip((getClassDto.page - 1) * getClassDto.pageSize)
            .take(getClassDto.pageSize);
        if (getClassDto.search) {
            query.where("class.className LIKE :search", {
                search: `%${getClassDto.search}%`,
            });
        }
        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
    async findOne(id) {
        return this.classRepository.findOne({ where: { classId: id } });
    }
    async create(classData) {
        const newClass = this.classRepository.create(classData);
        await this.classRepository.save(newClass);
        return { message: "新建成功" };
    }
    async update(id, classData) {
        const Class = await this.findOne(id);
        const updatedClass = Object.assign(Class, classData);
        return this.classRepository.save(updatedClass);
    }
    async delete(id) {
        await this.userClassRepository.delete({ classId: id });
        await this.classRepository.delete(id);
        return {
            message: "删除成功",
        };
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Class_entity_1.Class)),
    __param(1, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(UserClass_entity_1.UserClass)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map