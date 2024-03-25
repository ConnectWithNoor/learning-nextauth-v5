"use server";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenById,
  sendVerificationEmail,
  verifyToken,
} from "@/service/verificationToken";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/global/constant-msgs";

const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour in ms

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken?.id) {
    await removeVerificationTokenById(existingToken.id);
  }

  const verificationToken = await createVerificationToken(
    email,
    token,
    expires
  );

  return verificationToken;
};

const sendVerificationTokenEmail = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);

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

  const newVerificationToken = await generateVerificationToken(email);

  if (newVerificationToken) {
    await sendVerificationEmail(email, newVerificationToken.token);

    return {
      success: SUCCESS_MESSAGES.EmailVerificationSent,
    };
  }
  return {
    error: ERROR_MESSAGES.InternalServerError,
  };
};

const verifyTokenAction = async (token: string) => {
  return verifyToken(token);
};

export {
  generateVerificationToken,
  sendVerificationTokenEmail,
  verifyTokenAction,
};
