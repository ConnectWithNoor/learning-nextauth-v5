"use server";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/global/constant-msgs";
import { auth, updateSession } from "@/packages/nextauth/auth";
import { userSettingsSchema } from "@/schemas";
import * as z from "zod";
import { getUserByIdAction, updateUserByIdAction } from "./user";

async function UpdateSettingsAction(
  values: z.infer<typeof userSettingsSchema>
) {
  const validatedFields = userSettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: ERROR_MESSAGES.InvalidField };
  }

  const currentUserSession = await auth();
  if (!currentUserSession?.user?.id) {
    return { error: ERROR_MESSAGES.CredentialsSignin };
  }
  try {
    const currentDbUser = await getUserByIdAction(currentUserSession.user.id);
    if (!currentDbUser?.id) {
      return { error: ERROR_MESSAGES.CredentialsSignin };
    }

    // updating session manually

    // at the time of writing this, next-auth does not update the client session if we
    // update the user object in the server session.
    // maybe this will fix in future, but to fix it now, you can remove the update session from server
    // and use it in the client component to update both server and client sessions.
    // e.g: https://authjs.dev/reference/nextjs/react#updatesession
    // e.g: https://medium.com/@youngjun625/next-js14-nextauth-v5-2-session-update-b977cb6afd47
    updateSession({
      ...currentUserSession,
      user: {
        ...currentUserSession.user,
        name: values.name,
      },
    });

    await updateUserByIdAction(currentUserSession.user.id, values);

    return { success: SUCCESS_MESSAGES.default };
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
      return { error: ERROR_MESSAGES.InternalServerError };
    }
  }
}

export { UpdateSettingsAction };
