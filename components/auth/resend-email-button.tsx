"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { sendVerificationTokenEmail } from "@/actions/verification";
import { getUserByEmailAction } from "@/actions/user";
import { SUCCESS_MESSAGES } from "@/global/constant-msgs";

type Props = {
  userEmail?: string;
};

function ResendEmailButton({ userEmail }: Props) {
  const router = useRouter();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleResetClick = async () => {
    try {
      const url = new URL(window.location.href);
      url.search = "";
      setisLoading(true);
      const existingUser = await getUserByEmailAction(userEmail!);

      if (!existingUser?.id) {
        // show invalid credentails msg if user not found with email
        url.searchParams.set("error", "CredentialsSignin");
        router.replace(url.toString());
        return;
      }

      const verificationEmail = await sendVerificationTokenEmail(userEmail!);
      if (
        verificationEmail?.success ===
        SUCCESS_MESSAGES.AlreadySentVerificationEmail
      ) {
        // send already sent verification email message
        url.searchParams.set("success", "AlreadySentVerificationEmail");
        router.replace(url.toString());
        return;
      } else if (
        // send verification email message
        verificationEmail?.success === SUCCESS_MESSAGES.EmailVerificationSent
      ) {
        url.searchParams.set("success", "EmailVerificationSent");
        router.replace(url.toString());
        return;
      } else {
        // send error message
        url.searchParams.set("error", "InternalServerError");
        return;
      }
      // send success message
    } catch (error) {
      console.log("error", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading || !userEmail}
      type="button"
      variant="destructive"
      onClick={handleResetClick}
    >
      Resend
    </Button>
  );
}

export default ResendEmailButton;
