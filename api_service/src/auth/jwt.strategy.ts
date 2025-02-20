import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entiy/entities/User.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jonelsy",
    });
  }

  async validate(payload: any): Promise<User> {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
      openid: payload.openid || null,
      name: payload.name || null,
      createTime: payload.createTime || null,
      password: payload.password || null,
    };
  }
}
