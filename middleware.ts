import NextAuth from "next-auth";
import authConfig from "@/packages/nextauth/auth.config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { NextResponse } from "next/server";
import { PAGES } from "./global/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as any);

  if (isApiAuthRoute) {
    // allow all api auth routes
    return NextResponse.next();
  }

  // if user is logged in
  if (isAuthRoute) {
    if (isLoggedIn) {
      // redirect to default login redirect if user is logged in and trying to access auth route
      return NextResponse.redirect(new URL(PAGES.SETTINGS_PAGE, nextUrl));
    }

    return NextResponse.next();
  }

  // if user isn't logged in
  if (!isLoggedIn) {
    if (!isPublicRoute) {
      // redirect to login page if user is not logged in and trying to access protected route
      return NextResponse.redirect(new URL(PAGES.LOGIN, nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  // invoke at all routes starting with / and api/trpc
  // ignore all routes that is a static file or _next
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
