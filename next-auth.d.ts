import { UserRole as UserRoleSchemaType } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRoleSchemaType;
      emailVerified: Date;
    } & DefaultSession["user"];
  }
}
