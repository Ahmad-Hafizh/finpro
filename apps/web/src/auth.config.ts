import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "../../schemas/authSchema";
import { callAPI } from "@/config/axios";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateData = signInSchema.safeParse(credentials);

        if (!validateData.success) return null;
        const { email, password } = validateData.data;

        // signIn api
        const response = await callAPI.post("/account/sign-in", {
          email,
          password,
        });

        const { data } = response;
        if (!data.result || !data.result.password || !data.result.email) {
          return null;
        }

        return data.result;
      },
    }),
  ],
} satisfies NextAuthConfig;
