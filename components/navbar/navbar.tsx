"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/global/routes";
import UserButton from "@/components/auth/user-button";

type Props = {};

function Navbar({}: Props) {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === PAGES.SERVER_PAGE ? "default" : "outline"}
        >
          <Link href={PAGES.SERVER_PAGE}>Server</Link>
        </Button>

        <Button
          asChild
          variant={pathname === PAGES.CLIENT_PAGE ? "default" : "outline"}
        >
          <Link href={PAGES.CLIENT_PAGE}>Client</Link>
        </Button>

        <Button
          asChild
          variant={pathname === PAGES.ADMIN_PAGE ? "default" : "outline"}
        >
          <Link href={PAGES.ADMIN_PAGE}>Admin</Link>
        </Button>

        <Button
          asChild
          variant={pathname === PAGES.SETTINGS_PAGE ? "default" : "outline"}
        >
          <Link href={PAGES.SETTINGS_PAGE}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}

export default Navbar;
