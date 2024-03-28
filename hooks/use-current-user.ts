import { useSession } from "next-auth/react";

function UseCurrentUser() {
  const session = useSession();
  return session?.data?.user;
}

export default UseCurrentUser;
