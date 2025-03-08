import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { callAPI } from "./config/axios";
import { redirect } from "next/navigation";
import prisma from "./prisma";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: User & {
      role: string;
      isOauth: boolean;
      auth_token: string;
    } & DefaultSession["user"];
  }
  interface jwt {
    user: User & {
      role: string;
    };
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

        user.role = "user";
        return true;
      }

      if (!user.id) return false;
      const response = await callAPI.post("/account/get-user-by-id", {
        id: user.id,
      });

      user.role = response.data.result.role;

      if (
        !response.data.result.emailVerified &&
        !response.data.result.passowrd
      ) {
        redirect(`/auth/req-verify`);
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
      token.isOauth = response.data.result.accounts ? true : false;
      token.auth_token = response.data.result.auth_token;

      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role as string,
          isOauth: token.isOauth as boolean,
          auth_token: token.auth_token as string,
        },
      };
    },
  },
});
