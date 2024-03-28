"use client";
import { signOut } from "next-auth/react";

import UseCurrentUser from "@/hooks/use-current-user";
type Props = {};

function SettingsPage({}: Props) {
  const userSession = UseCurrentUser();
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="button" onClick={() => signOut()}>
        sign out
      </button>
    </div>
  );
}

export default SettingsPage;
