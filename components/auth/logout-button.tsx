"use client";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

function LogoutButton({ children }: Props) {
  return (
    <span className="cursor-pointer" onClick={() => signOut()}>
      {children}
    </span>
  );
}

export default LogoutButton;
