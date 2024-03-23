import NextAuth, { Session } from "next-auth";
import { UserRole as UserRoleSchemaType } from "@prisma/client";

import authConfig from "@/packages/nextauth/auth.config";
import customPrismaAdapter from "@/packages/nextauth/custom-prisma-adapter";

import { db } from "@/lib/db";
import { getUserByIdAction } from "@/actions/user";
import { sendVerificationTokenEmail } from "@/actions/verification";
// import { PAGES } from "@/global/routes";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // pages are buggy in v5. a PR is currently open to fix this
  // https://github.com/nextauthjs/next-auth/issues/9994
  // https://github.com/nextauthjs/next-auth/pull/10288
  events: {
    createUser: async ({ user }) => {
      const newUser = user as Session["user"];
      if (!newUser.emailVerified) {
        // send email verification on unverified OAuth Signups email

        await sendVerificationTokenEmail(`${newUser.email}`);
      }
    },
  },
  pages: {
    // signIn: PAGES.LOGIN,
    // error: PAGES.ERROR,
    // newUser: "/auth/welcome",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.id) return false;
      const existingUser = await getUserByIdAction(user.id);
      if (!existingUser) {
        // assuming that the user has just registered for the first time and  is not verified

        return true;
      }

      if (existingUser && !existingUser.emailVerified) {
        // user exists in our db is not verified

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

      if (token.isNewUser && session.user) {
        session.user.isNewUser = token.isNewUser as boolean;
      }

      return session;
    },

    async jwt({ token, isNewUser }) {
      const id = token.sub;
      if (!id) return token; //no id means logged out

      const existingUser = await getUserByIdAction(id);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.emailVerified = existingUser.emailVerified;

      // check if user this is a new session or not
      if (typeof isNewUser === "boolean") {
        // user is considered new only when they are not verified
        token.isNewUser = isNewUser && !existingUser.emailVerified;
      }

      return token;
    },
  },
  adapter: customPrismaAdapter(db),

  session: { strategy: "jwt" },
  ...authConfig,
});
