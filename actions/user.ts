"use server";

import { getUserByEmail, getUserById, updateUserById } from "@/service/user";

const getUserByEmailAction = async (email: string) => {
  return await getUserByEmail(email);
};

const getUserByIdAction = async (id: string) => {
  return await getUserById(id);
};

const updateUserByIdAction = async (
  id: string,
  data: { [key: string]: any }
) => {
  return await updateUserById(id, data);
};

export { getUserByEmailAction, getUserByIdAction, updateUserByIdAction };
