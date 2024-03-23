import LoginForm from "@/components/auth/login-form";
import React, { Suspense } from "react";

type Props = {};

function LoginPage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;
