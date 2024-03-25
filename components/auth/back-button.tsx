import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { href: string; label: string };

function BackButton({ href, label }: Props) {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackButton;
