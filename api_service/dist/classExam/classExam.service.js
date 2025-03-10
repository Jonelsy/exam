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
exports.ClassExamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Class_entity_1 = require("../entiy/entities/Class.entity");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
let ClassExamService = class ClassExamService {
    constructor(classExamRepository) {
        this.classExamRepository = classExamRepository;
    }
    async create(createClassExamDto) {
        const classExam = this.classExamRepository.create(createClassExamDto);
        return await this.classExamRepository.save(classExam);
    }
    async findAll(paginationDto) {
        const { page, pageSize } = paginationDto;
        const skip = (page - 1) * pageSize;
        const [classExams, total] = await this.classExamRepository.findAndCount({
            skip,
            take: pageSize,
            where: { teacherId: paginationDto.teacherId },
        });
        const classIds = classExams.map((ce) => ce.classId);
        const examIds = classExams.map((ce) => ce.examId);
        const classRepo = this.classExamRepository.manager.getRepository(Class_entity_1.Class);
        const examRepo = this.classExamRepository.manager.getRepository(Exam_entity_1.Exam);
        const [classes, exams] = await Promise.all([
            classRepo.findByIds(classIds),
            examRepo.findByIds(examIds),
        ]);
        const classMap = new Map(classes.map((c) => [c.classId, c]));
        const examMap = new Map(exams.map((e) => [e.examId, e]));
        const data = classExams.map((ce) => {
            const classInfo = classMap.get(ce.classId);
            const examInfo = examMap.get(ce.examId);
            return {
                id: ce.id,
                classId: ce.classId,
                className: classInfo?.className || "",
                examId: ce.examId,
                examName: examInfo?.examName || "",
                startTime: examInfo?.startTime || null,
                endTime: examInfo?.endTime || null,
            };
        });
        return {
            data,
            total,
            page,
            pageSize,
        };
    }
    async remove(id) {
        return await this.classExamRepository.delete(id);
    }
};
exports.ClassExamService = ClassExamService;
exports.ClassExamService = ClassExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ClassExam_entity_1.ClassExam)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassExamService);
//# sourceMappingURL=classExam.service.js.map