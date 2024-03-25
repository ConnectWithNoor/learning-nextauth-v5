"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/global/routes";

type Props = {};

function Social({}: Props) {
  const handleSignIn = async (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: PAGES.SETTINGS_PAGE,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
