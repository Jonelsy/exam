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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_entity_1 = require("../entiy/entities/User.entity");
const UserClass_entity_1 = require("../entiy/entities/UserClass.entity");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
let StudentService = class StudentService {
    constructor(userRepository, userClassRepository, classExamRepository, examRepository) {
        this.userRepository = userRepository;
        this.userClassRepository = userClassRepository;
        this.classExamRepository = classExamRepository;
        this.examRepository = examRepository;
    }
    async findAllExamList(item) {
        const userClass = await this.userClassRepository.findOne({
            where: { userId: item.userId },
            select: ["classId"],
        });
        if (!userClass) {
            throw new common_1.HttpException("未找到该用户的班级信息", common_1.HttpStatus.NOT_FOUND);
        }
        const classExams = await this.classExamRepository.find({
            where: { classId: userClass.classId },
            select: ["examId"],
        });
        if (!classExams.length) {
            return { data: [], total: 0 };
        }
        const examIds = classExams.map((ce) => ce.examId);
        const query = this.examRepository
            .createQueryBuilder("exam")
            .where("exam_id IN (:...examIds)", { examIds })
            .skip((item.page - 1) * item.pageSize)
            .take(item.pageSize);
        const [data, total] = await query.getManyAndCount();
        return { data, total };
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(UserClass_entity_1.UserClass)),
    __param(2, (0, typeorm_1.InjectRepository)(ClassExam_entity_1.ClassExam)),
    __param(3, (0, typeorm_1.InjectRepository)(Exam_entity_1.Exam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map