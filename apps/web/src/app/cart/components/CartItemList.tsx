/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import CartItemsListMobile from "./CartItemListMobile";
import CartItemsListDesktop from "./CartItemListDesktop";
import { CartItemsListDesktopProps } from "../types";

// interface CartItemsListProps extends CartItemsListDesktopProps {}

const CartItemsList: React.FC<CartItemsListDesktopProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? (
    <CartItemsListMobile {...props} />
  ) : (
    <CartItemsListDesktop {...props} />
  );
};

export default CartItemsList;
