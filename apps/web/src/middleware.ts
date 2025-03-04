import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;
  const fe_url = "http://localhost:3000";

  const privateRoutes = [
    "/setting",
    "/cart",
    "/order",
    "/admin",
    "/setting/address",
    "/setting/account",
  ];

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isAdminRoute = nextUrl.pathname.includes("/admin");
  const isApiRoute = nextUrl.pathname.includes("/api");

  if (isApiRoute) {
    return;
  }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(`${fe_url}/auth/signin`);
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(`${fe_url}/`);
  }

  if (isAdminRoute && !isLoggedIn && req.auth?.user.role != "user") {
    return NextResponse.redirect(`${fe_url}/auth/signin`);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
