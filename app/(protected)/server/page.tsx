import UserInfo from "@/components/auth/user-info";
import { auth } from "@/packages/nextauth/auth";
import React from "react";

type Props = {};

async function ServerPage({}: Props) {
  const session = await auth();

  return <UserInfo user={session?.user} label="💻 Server component" />;
}

export default ServerPage;
