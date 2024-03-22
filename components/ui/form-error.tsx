import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import ResendEmailButton from "@/components/auth/resend-email-button";

type Props = {
  message?: string;
  isResendAllowed?: boolean;
};

function FormError({ message, isResendAllowed = false }: Props) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      {isResendAllowed ? (
        <ExclamationTriangleIcon width="40" height="40" />
      ) : (
        <ExclamationTriangleIcon />
      )}
      <p>{message} </p>
      {isResendAllowed && <ResendEmailButton />}
    </div>
  );
}

export default FormError;
