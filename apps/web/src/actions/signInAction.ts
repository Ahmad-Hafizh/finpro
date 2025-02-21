"use server";
import { callAPI } from "@/config/axios";
import { signIn } from "@/config/auth";
import { AuthError } from "next-auth";

export const onSignIn = async (values: { email: string; password: string }) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };

        default:
          return { error: "please verify your email address" };
      }
    }
    throw error;
  }

  return { success: "User signed in successfully" };
};
