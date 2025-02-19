"use server";
import { signIn } from "@/config/auth";
import { AuthError } from "next-auth";

export async function googleAuthenticate() {
  try {
    await signIn("google", {
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "google sign in failed";
    }
    throw error;
  }
}
