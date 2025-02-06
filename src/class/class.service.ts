import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "../entiy/entities/Class.entity";

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>, // 注入Class实体的Repository
  ) {}

  // 获取所有班级
  async findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  // 根据ID获取单个班级
  async findOne(id: number): Promise<Class> {
    return this.classRepository.findOne({ where: { classId: id } });
  }

  // 创建新班级
  async create(classData: Partial<Class>): Promise<Class> {
    const newClass = this.classRepository.create(classData);
    return this.classRepository.save(newClass);
  }

  //更新班级信息
  async update(id: number, classData: Partial<Class>): Promise<any> {
    const Class = await this.findOne(id);
    const updatedClass = Object.assign(Class, classData);
    return this.classRepository.save(updatedClass);
  }

  // 删除班级
  async delete(id: number): Promise<any> {
    await this.classRepository.delete(id);
    return {
      message: "删除成功",
    };
  }
}
