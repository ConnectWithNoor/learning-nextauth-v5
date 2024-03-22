import { PAGES } from "@/global/routes";
import CardWrapper from "@/components/auth/card-wrapper";
import FormError from "@/components/ui/form-error";

type Props = { errorMessage: string };

export const ErrorCard = ({ errorMessage }: Props) => {
  return (
    <CardWrapper
      backButtonHref={PAGES.LOGIN}
      backbuttonLabel="Back to login"
      headerLabel="Oops! We encountered a mishap"
      showSocial={false}
    >
      <FormError message={errorMessage} />
    </CardWrapper>
  );
};
