import {
  createVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenById,
} from "@/service/verificationToken";
import { v4 as uuidv4 } from "uuid";

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

export { generateVerificationToken };
