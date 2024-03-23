"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/packages/nextauth/auth";
import { AuthError } from "next-auth";
import { AUTH_ERRORS } from "@/global/constant-msgs";
import { PAGES } from "@/global/routes";

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
      redirectTo: PAGES.SETTINGS_PAGE,
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
