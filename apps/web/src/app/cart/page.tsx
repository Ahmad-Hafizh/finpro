import React from "react";
import { auth } from "@/auth";
import Cart from "./Cart";

const CartPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return <p>Unauthorized</p>;
  }
  return <Cart session={session} />;
};

export default CartPage;
