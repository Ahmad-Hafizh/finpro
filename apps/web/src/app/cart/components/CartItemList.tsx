import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import CartItemsListMobile from "./CartItemListMobile";
import CartItemsListDesktop from "./CartItemListDesktop";
import { CartItemsListDesktopProps } from "../types";

interface CartItemsListProps extends CartItemsListDesktopProps {}

const CartItemsList: React.FC<CartItemsListProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? (
    <CartItemsListMobile {...props} />
  ) : (
    <CartItemsListDesktop {...props} />
  );
};

export default CartItemsList;
