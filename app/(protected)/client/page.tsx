"use client";

import UserInfo from "@/components/auth/user-info";
import UseCurrentUser from "@/hooks/use-current-user";

import React from "react";

type Props = {};

function ClientPage({}: Props) {
  const session = UseCurrentUser();

  return <UserInfo user={session} label="📱 Client component" />;
}

export default ClientPage;
