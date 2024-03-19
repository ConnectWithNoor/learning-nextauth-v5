import React from "react";

type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-blue-gradient">
      {children}
    </div>
  );
}

export default AuthLayout;
