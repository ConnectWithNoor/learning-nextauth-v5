import Navbar from "@/components/navbar/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function ProtectedLayout({ children }: Props) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 item-center justify-center bg-blue-gradient">
      <Navbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
