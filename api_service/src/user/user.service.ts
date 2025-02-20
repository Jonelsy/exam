import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entiy/entities/User.entity";
import { UserClass } from "src/entiy/entities/UserClass.entity";
import * as bcrypt from "bcrypt";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserClass)
    private userClassRepository: Repository<UserClass>,
    private jwtService: JwtService,
  ) {}

  //注册、、也叫给班级增加学生
  async register(registerUserDto: RegisterUserDto) {
    const { username, password, name, openid, classId } = registerUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException("用户已存在", HttpStatus.BAD_REQUEST);
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
    // 创建UserClass记录
    const userClass = this.userClassRepository.create({
      userId: savedUser.userId,
      classId: classId,
    });
    await this.userClassRepository.save(userClass);

    return {
      item: savedUser,
    };
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ["userId", "username", "name", "role", "password"],
    });
    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException("密码错误", HttpStatus.UNAUTHORIZED);
    }

    // 返回token
    const payload = {
      username: user.username,
      userId: user.userId,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return { token, payload, code: 200 };
  }

  async findAll(item: {
    classId?: number;
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{ data: User[]; total: number }> {
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
      } else {
        throw new HttpException("该班级没有学生", HttpStatus.OK);
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

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: any) {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const userClass = await this.userClassRepository.findOne({
      where: { userId: id },
    });
    await this.userRepository.remove(user);
    await this.userClassRepository.remove(userClass);
    return { message: "用户删除成功" };
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      select: ["userId", "password"],
    });
    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException("旧密码错误", HttpStatus.UNAUTHORIZED);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { message: "密码修改成功" };
  }
}
