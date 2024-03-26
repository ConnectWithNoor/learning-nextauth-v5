import React from "react";

type Props = {
  link: string;
};

function VerificationTemplateEmail({ link }: Props) {
  return (
    <div>
      <h1>Confirm your email</h1>
      <p>Click the link below to confirm your account.</p>

      <a href={link}>Confirm</a>
    </div>
  );
}

export default VerificationTemplateEmail;
