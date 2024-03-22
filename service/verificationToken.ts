import { db } from "@/lib/db";

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

export {
  getVerificationTokenByEmail,
  getVerificationTokenByToken,
  removeVerificationTokenById,
  createVerificationToken,
};
