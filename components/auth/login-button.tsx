import { PAGES } from "@/global/routes";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  onClick?: () => void;
};

function LoginButton({ children, asChild, mode = "redirect" }: Props) {
  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span className="cursor-pointer">
      <Link href={PAGES.LOGIN}>{children}</Link>
    </span>
  );
}

export default LoginButton;
