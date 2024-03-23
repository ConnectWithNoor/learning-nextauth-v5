"use server";

import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenById,
  sendVerificationEmail,
} from "@/service/verificationToken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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
        success:
          "You have already received a verification email. Please check your inbox.",
      };
    }
  }

  // if token is expired or didn't exist, generate a new one

  const newVerificationToken = await generateVerificationToken(email);

  if (newVerificationToken) {
    await sendVerificationEmail(email, newVerificationToken.token);

    return {
      success: "Verification email sent. Please check your inbox.",
    };
  }
  return {
    error: "We have encountered an internal error",
  };
};

export { generateVerificationToken, sendVerificationTokenEmail };
