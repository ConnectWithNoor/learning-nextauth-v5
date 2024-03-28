import "server-only";

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const updateUserById = async (
  id: string,
  data: { [key: string]: any }
) => {
  try {
    await db.user.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    return null;
  }
};
