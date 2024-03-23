import VerificationTemplateEmail from "@/components/auth/verification-email-template";
import { db } from "@/lib/db";
import resend from "@/lib/email";

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
    console.log(error);
    return null;
  }
};

const sendVerificationEmail = async (
  email: string,
  token: string,
  hostname: string
) => {
  try {
    const confirmLink = `${hostname}/auth/new-verification?token=${token}`;
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Confirm your email",
      react: VerificationTemplateEmail({ confirmLink }),
    });
  } catch (error) {
    return null;
  }
};

export {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  removeVerificationTokenById,
  createVerificationToken,
  sendVerificationEmail,
};
