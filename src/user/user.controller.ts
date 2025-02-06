import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  RegisterUserDto,
  LoginUserDto,
  UpdateUserDto,
  ChangePasswordDto,
} from "./dto/register-user.dto";
import { RolesGuard } from "../auth/roles.guard";
// import { Roles, ExclusiveRoles } from "../auth/decorators/roles.decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("用户相关管理")
@Controller("user")
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  @ApiOperation({ summary: "注册" })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 201, description: "用户注册成功" })
  @ApiResponse({ status: 400, description: "User already exists" })
  async register(@Body() item: RegisterUserDto) {
    return this.userService.register(item);
  }

  @Post("/login")
  @ApiOperation({ summary: "登录" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: "用户登陆成功" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() item: LoginUserDto) {
    return this.userService.login(item.username, item.password);
  }

  @Get("/userList")
  @ApiOperation({ summary: "获取所有用户" })
  @ApiResponse({ status: 200, description: "成功获取用户列表" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  @ApiBearerAuth("jwt")
  @UseGuards(AuthGuard("jwt"))
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "获取单个用户" })
  @ApiResponse({ status: 200, description: "成功获取用户信息" })
  @ApiResponse({ status: 404, description: "用户不存在" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: "更新用户信息" })
  @ApiResponse({ status: 200, description: "用户信息更新成功" })
  @ApiResponse({ status: 404, description: "用户不存在" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch("/change-password/:id")
  @ApiBody({ type: ChangePasswordDto })
  @ApiOperation({ summary: "修改用户密码" })
  @ApiResponse({ status: 200, description: "密码修改成功" })
  @ApiResponse({ status: 400, description: "旧密码不正确" })
  @ApiResponse({ status: 404, description: "用户不存在" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  async changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(
      +id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除用户" })
  @ApiResponse({ status: 200, description: "用户删除成功" })
  @ApiResponse({ status: 404, description: "用户不存在" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  async remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Get("/protected-data")
  @ApiOperation({ summary: "获取受保护的数据" })
  @ApiResponse({ status: 200, description: "成功获取受保护的数据" })
  // @Roles(0, 1)
  // @ExclusiveRoles(0, 1)
  async getProtectedData() {
    return {
      message: "这个接口只允许role为0或1访问",
    };
  }
}
