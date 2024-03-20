import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      name: "Credentials",

      // authorize runs when signin is called in login server action
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
