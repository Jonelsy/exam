import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: number[]) => SetMetadata("roles", roles);
export const ExclusiveRoles = (...roles: number[]) =>
  SetMetadata("exclusiveRoles", roles);
