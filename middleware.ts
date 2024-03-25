import { authRoutes, nextAuthBuildInRoutes, publicRoutes } from "@/routes";
import { NextResponse } from "next/server";
import { PAGES } from "./global/routes";

import { auth } from "@/packages/nextauth/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userSession = req.auth?.user || null;

  const isApiAuthRoute = nextUrl.pathname.startsWith(PAGES.API_AUTH_PREFIX);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as any);

  if (isApiAuthRoute) {
    // redirect to login page if user goes to nextauth build-in routes
    if (nextAuthBuildInRoutes.includes(nextUrl.pathname as any)) {
      const searchParams = new URL(req.nextUrl.clone()).searchParams;
      const redirectToLoginRoute = new URL(PAGES.LOGIN, nextUrl);

      for (const [key, value] of searchParams.entries()) {
        redirectToLoginRoute.searchParams.append(key, value);
      }

      return NextResponse.redirect(new URL(redirectToLoginRoute, req.url));
    }

    // else allow all api auth routes
    return NextResponse.next();
  }

  // if it is an auth route
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userSession?.emailVerified) {
        if (nextUrl.pathname === PAGES.NEW_VERIFIFCATION) {
          // allow user to access new verification page if user is logged in and verified
          // this is allowed since user can update their email and password and they will be required to
          // verify it again
          return NextResponse.next();
        }
        // redirect to default login redirect if user is logged in and trying to access auth route
        return NextResponse.redirect(new URL(PAGES.SETTINGS_PAGE, nextUrl));
      }
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

  if (!isPublicRoute) {
    if (isLoggedIn) {
      if (!userSession?.emailVerified) {
        // redirect to login page if user is not verified and tring to login
        const redirectToLoginRoute = new URL(PAGES.LOGIN, nextUrl);
        redirectToLoginRoute.searchParams.set("error", "AccessDenied");

        return NextResponse.redirect(new URL(redirectToLoginRoute, nextUrl));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  // invoke at all routes starting with / and api/trpc
  // ignore all routes that is a static file or _next
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
