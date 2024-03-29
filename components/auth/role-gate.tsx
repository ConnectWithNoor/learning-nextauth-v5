"use client";

import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "../ui/form-error";
import { ERROR_MESSAGES } from "@/global/constant-msgs";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

function RoleGate({ allowedRoles, children }: Props) {
  const session = useSession();
  const currentRole = session?.data?.user?.role;

  if (currentRole && !allowedRoles.includes(currentRole)) {
    return <FormError message={ERROR_MESSAGES.PermissionDenied} />;
  }

  return <>{children}</>;
}

export default RoleGate;
