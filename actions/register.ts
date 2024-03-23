"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/service/user";
import { sendVerificationTokenEmail } from "@/actions/verification";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  hostname: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
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
    return await sendVerificationTokenEmail(email, hostname);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending verification email", error.message);
    }
    return { success: "We have encountered an internal error" };
  }
};
