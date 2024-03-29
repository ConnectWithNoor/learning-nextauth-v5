export const PAGES = {
  // auth pages
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ERROR: "/auth/error",
  FORGET_PASSWORD: "/auth/forget-password",

  // welcome
  Welcome: "/welcome",

  // account verification
  NEW_VERIFIFCATION: "/auth/new-verification",
  NEW_PASSOWRD: "/auth/new-password",

  // settings page
  SETTINGS_PAGE: "/settings",

  // server page
  SERVER_PAGE: "/server",

  // client page
  CLIENT_PAGE: "/client",

  // admin page
  ADMIN_PAGE: "/admin",

  // API routes
  API_AUTH_PREFIX: "/api/auth",
  // next-auth build-in routes
  NEXT_AUTH_API_AUTH_ERROR: "/api/auth/error",
  NEXT_AUTH_API_AUTH_SIGNIN: "/api/auth/signin",
} as const;
