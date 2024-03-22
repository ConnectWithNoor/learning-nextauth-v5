"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

function ResendEmailButton({}: Props) {
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() => console.log("clicked")}
    >
      Resend
    </Button>
  );
}

export default ResendEmailButton;
