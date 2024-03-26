"use server";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/global/constant-msgs";
import { v4 as uuidv4 } from "uuid";
import { forgetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/service/user";
import { AuthError } from "next-auth";
import * as z from "zod";
import {
  createPasswordResetToken,
  getPassworkResetTokenByEmail,
  removePasswordResetTokenById,
  sendPasswordResetEmail,
} from "@/service/password-reset-token";
import moment from "moment";

const forgetPasswordAction = async (
  values: z.infer<typeof forgetPasswordSchema>
) => {
  const validatedFields = forgetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.InvalidField };
  }

  try {
    const existingUser = await getUserByEmail(validatedFields.data.email);

    if (!existingUser) {
      return { error: ERROR_MESSAGES.CredentialsSignin };
    }

    if (!existingUser?.password) {
      // OAUTH users aren't allowed to reset passwords

      return { error: ERROR_MESSAGES.OAuthResetPasswordNotAllowed };
    }

    const result = await sendResetPasswordEmail(validatedFields.data.email);
    if (result.success) {
      return { success: result.success };
    }

    return { error: result.error };
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage =
        ERROR_MESSAGES[error.type as keyof typeof ERROR_MESSAGES] ||
        "An error occurred!";

      return { error: errorMessage };
    }

    throw error;
  }
};

const generateForgetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour in ms

  const existingToken = await getPassworkResetTokenByEmail(email);

  if (existingToken?.id) {
    await removePasswordResetTokenById(existingToken.id);
  }

  const resetPasswordToken = await createPasswordResetToken(
    email,
    token,
    expires
  );

  return resetPasswordToken;
};

const sendResetPasswordEmail = async (email: string) => {
  const existingToken = await getPassworkResetTokenByEmail(email);

  if (existingToken?.id) {
    // check if token is not expired yet
    const tokenExpiration = moment(existingToken.expires);
    const currentTime = moment();

    const isExpired = tokenExpiration.isBefore(currentTime);
    if (!isExpired) {
      return {
        success: SUCCESS_MESSAGES.AlreadySentVerificationEmail,
      };
    }
  }
  // if token is expired or didn't exist, generate a new one

  const newVerificationToken = await generateForgetPasswordToken(email);
  if (newVerificationToken) {
    await sendPasswordResetEmail(email, newVerificationToken.token);

    return {
      success: SUCCESS_MESSAGES.PasswordResetEmailSent,
    };
  }
  return {
    error: ERROR_MESSAGES.InternalServerError,
  };
};

export {
  forgetPasswordAction,
  generateForgetPasswordToken,
  sendResetPasswordEmail,
};
