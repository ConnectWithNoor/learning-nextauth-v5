import { PAGES } from "@/global/routes";

const publicRoutes = ["/"];

const authRoutes = [
  PAGES.LOGIN,
  PAGES.REGISTER,
  PAGES.ERROR,
  PAGES.NEW_VERIFIFCATION,
  PAGES.FORGET_PASSWORD,
  PAGES.NEW_PASSOWRD,
];

const nextAuthBuildInRoutes = [
  PAGES.NEXT_AUTH_API_AUTH_ERROR,
  PAGES.NEXT_AUTH_API_AUTH_SIGNIN,
];

export { publicRoutes, authRoutes, nextAuthBuildInRoutes };
