import React from "react";
import { Box, Typography } from "@mui/material";
import { ShoppingCart as CartIcon } from "@mui/icons-material";

interface CartHeaderProps {
  cartCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ cartCount }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
    <CartIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
    <Typography variant="h4" component="h1" fontWeight={600}>
      Your Cart ({cartCount})
    </Typography>
  </Box>
);

export default CartHeader;
