import VerificationTemplateEmail from "@/components/auth/verification-email-template";
import { PAGES } from "@/global/routes";
import { db } from "@/lib/db";
import resend from "@/lib/email";

const getPassworkResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

const getPassworkResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

const removePasswordResetTokenById = async (id: string) => {
  try {
    await db.passwordResetToken.deleteMany({
      where: { id },
    });
    return;
  } catch (error) {
    return null;
  }
};

const createPasswordResetToken = async (
  email: string,
  token: string,
  expires: Date
) => {
  try {
    const resetPasswordToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return resetPasswordToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const hostname = process.env.ROOT_URL;
    const resetLink = `${hostname}${PAGES.NEW_PASSOWRD}?token=${token}`;
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Reset your password",
      react: VerificationTemplateEmail({ link: resetLink }),
    });
    return;
  } catch (error) {
    console.error("error while sending email", error);

    return null;
  }
};

export {
  getPassworkResetTokenByToken,
  getPassworkResetTokenByEmail,
  removePasswordResetTokenById,
  createPasswordResetToken,
  sendPasswordResetEmail,
};
