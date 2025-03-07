import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { callAPI } from "./config/axios";

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
    "/admin/order",
    "/payment-proof",
  ];

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isAdminRoute = nextUrl.pathname.includes("/admin");
  const isApiRoute = nextUrl.pathname.includes("/api");

  // if (isApiRoute) {
  //   return;
  // }

  // if (isPrivateRoute && !isLoggedIn) {
  //   return NextResponse.redirect(`${fe_url}/auth/signin`);
  // }

  // if (isAuthRoute && isLoggedIn) {
  //   return NextResponse.redirect(`${fe_url}/`);
  // }

  // if (isAdminRoute) {
  //   const response = await callAPI.post("/account/get-role", {
  //     email: req.auth?.user.email,
  //   });

  //   if (response.data.result.role == "user") {
  //     return NextResponse.redirect(`${fe_url}/`);
  //   }
  // }

  if (isApiRoute) {
    return;
  }

  if ((isPrivateRoute && !isLoggedIn) || (isAdminRoute && !isLoggedIn)) {

    if ((isPrivateRoute && !isLoggedIn) || (isAdminRoute && !isLoggedIn)) {
      return NextResponse.redirect(`${fe_url}/auth/signin`);
    }


    if (isAuthRoute && isLoggedIn) {
      return NextResponse.redirect(`${fe_url}/`);
    }

    if (isAdminRoute && isLoggedIn) {
      const response = await callAPI.post("/account/get-role", {
        email: req.auth?.user?.email,
      });
      if (response.data.result.role == "user") {
        return NextResponse.redirect(`${fe_url}/`);
      }
    }

    return;

  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
