import "server-only";

import VerificationTemplateEmail from "@/components/auth/verification-email-template";
import { PAGES } from "@/global/routes";
import { db } from "@/lib/db";
import resend from "@/lib/email";
import moment from "moment";
import { getUserByEmail, updateUserById } from "./user";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/global/constant-msgs";

const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

const removeVerificationTokenById = async (id: string) => {
  try {
    await db.verificationToken.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return null;
  }
};

const createVerificationToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const hostname = process.env.ROOT_URL;
    const confirmLink = `${hostname}${PAGES.NEW_VERIFIFCATION}?token=${token}`;
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Confirm your email",
      react: VerificationTemplateEmail({ link: confirmLink }),
    });
    return;
  } catch (error) {
    console.error("error while sending email", error);

    return null;
  }
};

const deleteVerificationTokenByEmail = async (email: string) => {
  try {
    await db.verificationToken.deleteMany({
      where: { email },
    });
    return;
  } catch (error) {
    return null;
  }
};

const verifyToken = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      throw new Error(ERROR_MESSAGES.InvalidToken);
    }

    // check if token is expired
    const tokenExpiration = moment(existingToken.expires);
    const currentTime = moment();

    const isExpired = tokenExpiration.isBefore(currentTime);
    if (isExpired) {
      throw new Error(ERROR_MESSAGES.TokenExpired);
    }

    // get user by email and check it it exists (to prevent if the use change email in the meantime)

    const exisitngUser = await getUserByEmail(existingToken.email);
    if (!exisitngUser?.id || !exisitngUser?.email) {
      throw new Error(ERROR_MESSAGES.CredentialsSignin);
    }

    // set user emailVerified in db
    await updateUserById(exisitngUser.id, { emailVerified: new Date() });
    // delete token from db
    await deleteVerificationTokenByEmail(exisitngUser.email);

    return { success: SUCCESS_MESSAGES.TokenVerified };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
};

export {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  removeVerificationTokenById,
  createVerificationToken,
  sendVerificationEmail,
  deleteVerificationTokenByEmail,
  verifyToken,
};
