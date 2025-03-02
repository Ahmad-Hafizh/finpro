import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { callAPI } from "./config/axios";
import { redirect } from "next/navigation";
import prisma from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      isOauth: boolean;
    } & DefaultSession["user"];
  }
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") {
        await callAPI.post("/account/oauth-signup", {
          name: user.name,
          id: user.id,
        });

        return true;
      }

      if (!user.id) return false;
      const response = await callAPI.post("/account/get-user-by-id", {
        id: user.id,
      });

      if (
        !response.data.result.emailVerified &&
        !response.data.result.passowrd
      ) {
        redirect("/account-not-verified");
        return false;
      }

      return true;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const response = await callAPI.post("/account/get-user-by-id", {
        id: token.sub,
      });

      if (!response.data.result) return token;

      token.role = response.data.result.role;
      token.isOauth = response.data.result.accounts[0] ? true : false;

      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
