"use server";

import { signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signOutAction = async () => {
  try {
    await signOut({ redirectTo: "/" });
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

  return { success: "User signed out successfully" };
};
