"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmailAction } from "@/actions/user";
import { sendVerificationTokenEmail } from "@/actions/verification";
import { ERROR_MESSAGES } from "@/global/constant-msgs";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  hostname: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.InvalidField };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmailAction(email);

  if (existingUser) {
    return { error: ERROR_MESSAGES.EmailInUse };
  }

  // if new user, hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // send verification email when user register with credentials

  try {
    return await sendVerificationTokenEmail(email);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending verification email", error.message);
    }
    return { error: ERROR_MESSAGES.InternalServerError };
  }
};
