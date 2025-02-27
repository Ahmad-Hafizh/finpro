"use server";

import { signOut } from "@/auth";

export const signOutAction = async () => {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    console.log(error);
  }
};
