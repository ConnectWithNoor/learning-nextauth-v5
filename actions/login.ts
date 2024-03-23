"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/packages/nextauth/auth";
import { AuthError } from "next-auth";
import { ERROR_MESSAGES } from "@/global/constant-msgs";
import { PAGES } from "@/global/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.InvalidField };
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
        ERROR_MESSAGES[error.type as keyof typeof ERROR_MESSAGES] ||
        "An error occurred!";

      return { error: errorMessage };
    }

    throw error;
  }
  return { success: "Email sent!" };
};
