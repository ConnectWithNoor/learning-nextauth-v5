import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole as UserRoleSchemaType } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = user as Session["user"];
      if (!existingUser || !existingUser.emailVerified) {
        // TODO: turn it false for unverified users later.

        return true;
      }

      return true;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub; // sub is the user id in db
      }

      if (token.role && session.user) {
        // get type definitions in next-auth.d.ts
        session.user.role = token.role as UserRoleSchemaType;
        session.user.emailVerified = token.emailVerified as Date;
      }
      return session;
    },

    async jwt({ token }) {
      const id = token.sub;
      if (!id) return token; //no id means logged out

      const existingUser = await getUserById(id);

      if (!existingUser) return token;
      token.role = existingUser.role;
      token.emailVerified = existingUser.emailVerified;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
