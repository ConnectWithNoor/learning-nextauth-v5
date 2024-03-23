import React from "react";

type Props = {
  confirmLink: string;
};

function VerificationTemplateEmail({ confirmLink }: Props) {
  return (
    <div>
      <h1>Confirm your email</h1>
      <p>Click the link below to confirm your account.</p>

      <a href={confirmLink}>Confirm</a>
    </div>
  );
}

export default VerificationTemplateEmail;
