import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/service/user";
import { LoginSchema } from "@/schemas";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          isUserVerified: profile?.two_factor_authentication,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isUserVerified: profile?.email_verified,
        };
      },
    }),
    Credentials({
      name: "Credentials",

      // authorize runs when signin is called in login server action for credentials
      async authorize(credentials) {
        const validatedfields = LoginSchema.safeParse(credentials);

        if (validatedfields.success) {
          const { email, password } = validatedfields.data;

          const user = await getUserByEmail(email);

          // If you return null then an error will be displayed advising the user to check their details.

          if (!user || !user?.password) return null;

          const isValidPassword = await bcrypt.compare(password, user.password);
          // Any object returned will be saved in `user` property of the JWT
          if (isValidPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
