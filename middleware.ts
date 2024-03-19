import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(isLoggedIn, req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  // invoke at all routes starting with / and api/trpc
  // ignore all routes that is a static file or _next
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
