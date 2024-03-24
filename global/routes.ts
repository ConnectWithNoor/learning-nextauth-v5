export const PAGES = {
  // auth pages
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ERROR: "/auth/error",

  // welcome
  Welcome: "/welcome",

  // account verification
  NEW_VERIFIFCATION: "/new-verification",

  // settings page
  SETTINGS_PAGE: "/settings",

  // API routes
  API_AUTH_PREFIX: "/api/auth",
  // next-auth build-in routes
  NEXT_AUTH_API_AUTH_ERROR: "/api/auth/error",
} as const;
