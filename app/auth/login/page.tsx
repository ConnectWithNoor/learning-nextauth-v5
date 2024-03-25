import React, { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";

type Props = {};

function LoginPage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;
