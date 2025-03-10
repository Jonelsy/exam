import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "../entiy/entities/Class.entity";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "../entiy/entities/UserClass.entity";
import { UserClassDto } from "./dto/class.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserClass)
    private userClassRepository: Repository<UserClass>,
  ) {}

  // 创建学生与班级的关联
  async createStudentClassRelation(
    teacherId: number,
    classId: number,
    userClassDto: UserClassDto,
  ): Promise<any> {
    // 加密密码
    const hashedPassword = await bcrypt.hash(userClassDto.password, 10);
    // 创建新用户
    const newUser = this.userRepository.create({
      ...userClassDto,
      password: hashedPassword,
      role: 0, // 0 表示学生
    });
    await this.userRepository.save(newUser);
    // 创建用户班级关联，使用新创建的学生ID
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

  // 获取老师ID下所有班级（带分页和搜索）
  async findAll(getClassDto): Promise<{ data: Class[]; total: number }> {
    const query = this.classRepository
      .createQueryBuilder("class")
      .where("class.teacherId = :teacherId", {
        teacherId: getClassDto.teacherId,
      })
      .skip((getClassDto.page - 1) * getClassDto.pageSize)
      .take(getClassDto.pageSize);

    if (getClassDto.search) {
      query.andWhere("class.className LIKE :search", {
        search: `%${getClassDto.search}%`,
      });
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  // 根据ID获取单个班级
  async findOne(id: number): Promise<Class> {
    return this.classRepository.findOne({ where: { classId: id } });
  }

  // 创建新班级(老师id自动绑定)
  async create(classData: Partial<Class>): Promise<any> {
    const newClass = this.classRepository.create(classData);
    await this.classRepository.save(newClass);
    return { message: "新建成功" };
  }

  // 更新班级信息
  async update(id: number, classData: Partial<Class>): Promise<any> {
    const Class = await this.findOne(id);
    const updatedClass = Object.assign(Class, classData);
    return this.classRepository.save(updatedClass);
  }

  // 删除班级
  async delete(id: number): Promise<any> {
    // 先删除userClass表中所有关联记录
    await this.userClassRepository.delete({ classId: id });
    // 再删除班级表记录
    await this.classRepository.delete(id);
    return {
      message: "删除成功",
    };
  }
}
