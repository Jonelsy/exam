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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const ExamRecord_entity_1 = require("../entiy/entities/ExamRecord.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Exam_entity_1 = require("../entiy/entities/Exam.entity");
const ClassExam_entity_1 = require("../entiy/entities/ClassExam.entity");
const Question_entity_1 = require("../entiy/entities/Question.entity");
const Option_entity_1 = require("../entiy/entities/Option.entity");
let ExamService = class ExamService {
    constructor(examRepository, classExamRepository, questionRepository, optionRepository, examRecordRepository) {
        this.examRepository = examRepository;
        this.classExamRepository = classExamRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.examRecordRepository = examRecordRepository;
    }
    async create(createExamDto) {
        const exam = this.examRepository.create(createExamDto);
        return await this.examRepository.save(exam);
    }
    async findAll(query) {
        const { classId, teacherId, page = 1, pageSize = 10 } = query;
        if (classId && teacherId) {
            throw new common_1.NotFoundException(`不可以都传`);
        }
        if (teacherId) {
            const [exams, total] = await this.examRepository.findAndCount({
                where: { teacherId },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            const totalPages = Math.ceil(total / pageSize);
            return { exams, total, totalPages };
        }
        if (classId) {
            const [classExamList, total] = await this.classExamRepository.findAndCount({
                where: { classId },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            const examPromises = classExamList.map(async (classExam) => {
                return this.examRepository.findOneBy({ examId: classExam.examId });
            });
            const exams = await Promise.all(examPromises);
            const totalPages = Math.ceil(total / pageSize);
            return { exams, total, totalPages };
        }
        throw new common_1.NotFoundException(`传递Id有误`);
    }
    async findOne(id) {
        const exam = await this.examRepository.findOne({ where: { examId: id } });
        if (!exam) {
            throw new common_1.NotFoundException(`${id} 没有找到`);
        }
        return exam;
    }
    async update(updateExamDto) {
        const exam = await this.findOne(updateExamDto.examId);
        const newExam = Object.assign(exam, updateExamDto);
        return await this.examRepository.save(newExam);
    }
    async remove(id) {
        const result = await this.examRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(` ${id} 不存在`);
        }
    }
    async createQuestion(createQuestionDto) {
        await this.questionRepository.delete({ examId: createQuestionDto.examId });
        const question = this.questionRepository.create(createQuestionDto);
        return await this.questionRepository.save(question);
    }
    async findAllQuestions(examId, page, pageSize) {
        const [result, count] = await this.questionRepository.findAndCount({
            where: { examId },
            order: { orderNum: "ASC" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        const questionIds = result.map((question) => question.questionId);
        const options = await this.optionRepository.find({
            where: { questionId: (0, typeorm_2.In)(questionIds) },
        });
        const optionsMap = options.reduce((map, option) => {
            if (!map[option.questionId]) {
                map[option.questionId] = [];
            }
            map[option.questionId].push(option);
            return map;
        }, {});
        const questionsWithOptions = result.map((question) => ({
            ...question,
            options: optionsMap[question.questionId] || [],
        }));
        const totalPages = Math.ceil(count / pageSize);
        return { questions: questionsWithOptions, total: count, totalPages };
    }
    async findOneQuestion(id) {
        const question = await this.questionRepository.findOne({
            where: { questionId: id },
        });
        if (!question) {
            throw new common_1.NotFoundException(`题目 ${id} 不存在`);
        }
        return question;
    }
    async updateQuestion(id, updateQuestionDto) {
        const question = await this.findOneQuestion(id);
        const updatedQuestion = Object.assign(question, updateQuestionDto);
        return await this.questionRepository.save(updatedQuestion);
    }
    async removeQuestion(id) {
        const result = await this.questionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`题目 ${id} 不存在`);
        }
    }
    async createOption(createOptionDto) {
        await this.optionRepository.delete({ examId: createOptionDto.examId });
        const question = await this.questionRepository.findOne({
            where: { questionId: createOptionDto.questionId },
        });
        if (!question) {
            throw new common_1.NotFoundException(`题目 ${createOptionDto.questionId} 不存在`);
        }
        if (question.questionType === 0) {
            const options = await this.optionRepository.find({
                where: { questionId: createOptionDto.questionId },
            });
            const hasCorrectAnswer = options.some((option) => option.isCorrect);
            if (hasCorrectAnswer && createOptionDto.isCorrect) {
                throw new common_1.NotFoundException("单选题只能有一个正确答案");
            }
        }
        const option = this.optionRepository.create(createOptionDto);
        return await this.optionRepository.save(option);
    }
    async getOptionById(id) {
        const option = await this.optionRepository.findOne({
            where: { optionId: id },
        });
        if (!option) {
            throw new common_1.NotFoundException(`选项 ${id} 不存在`);
        }
        return option;
    }
    async updateOption(id, updateOptionDto) {
        const option = await this.getOptionById(id);
        const updatedOption = Object.assign(option, updateOptionDto);
        return await this.optionRepository.save(updatedOption);
    }
    async deleteOption(id) {
        const result = await this.optionRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`选项 ${id} 不存在`);
        }
    }
    async createExamRecord(createExamRecordDto) {
        const examRecord = this.examRecordRepository.create(createExamRecordDto);
        return await this.examRecordRepository.save(examRecord);
    }
    async bindExamToClass(examId, classId) {
        const exam = await this.examRepository.findOne({ where: { examId } });
        if (!exam) {
            throw new common_1.NotFoundException(`考试 ${examId} 不存在`);
        }
        const classExam = this.classExamRepository.create({
            examId,
            classId,
        });
        return await this.classExamRepository.save(classExam);
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Exam_entity_1.Exam)),
    __param(1, (0, typeorm_1.InjectRepository)(ClassExam_entity_1.ClassExam)),
    __param(2, (0, typeorm_1.InjectRepository)(Question_entity_1.Question)),
    __param(3, (0, typeorm_1.InjectRepository)(Option_entity_1.Option)),
    __param(4, (0, typeorm_1.InjectRepository)(ExamRecord_entity_1.ExamRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ExamService);
//# sourceMappingURL=exam.service.js.map