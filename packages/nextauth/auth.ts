import NextAuth from "next-auth";
import { UserRole as UserRoleSchemaType } from "@prisma/client";

import authConfig from "@/packages/nextauth/auth.config";
import customPrismaAdapter from "@/packages/nextauth/custom-prisma-adapter";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user?.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        // assuming that the user has just registered for the first time and  is not verified

        return true;
      }

      if (existingUser && !existingUser.emailVerified) {
        // user exists in our db is not verified
        // TODO: change it to false
        return false;
      }
      // defauilt return true
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
  adapter: customPrismaAdapter(db),
  // pages are buggy in v5. a PR is currently open to fix this
  // https://github.com/nextauthjs/next-auth/issues/9994
  // https://github.com/nextauthjs/next-auth/pull/10288
  session: { strategy: "jwt" },
  ...authConfig,
});
