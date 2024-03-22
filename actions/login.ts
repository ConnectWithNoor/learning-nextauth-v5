"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/packages/nextauth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { AUTH_ERRORS } from "@/packages/nextauth/error-msgs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage =
        AUTH_ERRORS[error.type as keyof typeof AUTH_ERRORS] ||
        "An error occurred!";

      return { error: errorMessage };
    }

    throw error;
  }
  return { success: "Email sent!" };
};
