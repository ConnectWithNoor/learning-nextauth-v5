import { ErrorCard } from "@/components/auth/error-card";

type Props = {};

function ErrorPage({}: Props) {
  // TODO: get error from query params and pass it to message prop
  // when pages PR is fixed
  return <ErrorCard errorMessage="Something went wrong" />;
}

export default ErrorPage;
