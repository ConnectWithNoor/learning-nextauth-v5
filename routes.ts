import { PAGES } from "@/global/routes";

const publicRoutes = ["/"];

const authRoutes = [
  PAGES.LOGIN,
  PAGES.REGISTER,
  PAGES.ERROR,
  PAGES.NEW_VERIFIFCATION,
];

const nextAuthBuildInRoutes = [PAGES.NEXT_AUTH_API_AUTH_ERROR];

export { publicRoutes, authRoutes, nextAuthBuildInRoutes };
