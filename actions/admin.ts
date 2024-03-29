"use server";

import { ERROR_MESSAGES } from "@/global/constant-msgs";
import { auth } from "@/packages/nextauth/auth";
import { UserRole } from "@prisma/client";

// Role based Server Action for Admin
async function AdminAction() {
  const currentSession = await auth();

  if (currentSession?.user?.role === UserRole.ADMIN) {
    return { success: "Allowed" };
  }

  return { error: ERROR_MESSAGES.PermissionDenied };
}

export { AdminAction };
