"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../entiy/entities/User.entity");
const UserClass_entity_1 = require("../entiy/entities/UserClass.entity");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("../auth/jwt.strategy");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            typeorm_1.TypeOrmModule.forFeature([User_entity_1.User, UserClass_entity_1.UserClass]),
            jwt_1.JwtModule.register({
                secret: "jonelsy",
                signOptions: { expiresIn: "1h" },
            }),
        ],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map