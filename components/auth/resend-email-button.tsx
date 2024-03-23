"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateVerificationToken } from "@/actions/verification";

type Props = {
  userEmail?: string;
};

function ResendEmailButton({ userEmail }: Props) {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleResetClick = async () => {
    setisLoading(true);

    const verificationToken = await generateVerificationToken(userEmail!);
    console.log(verificationToken);

    setisLoading(false);
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
