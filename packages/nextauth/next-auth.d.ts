import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole as UserRoleSchemaType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRoleSchemaType;
      emailVerified: Date;
      isNewUser?: boolean;
    } & DefaultSession["user"];
  }
}
