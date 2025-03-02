import React from "react";
import { Box, Paper } from "@mui/material";
import { CartItemsListDesktopProps } from "../types";
import CartDesktopHeader from "./CartDesktopHeader";
import CartItemRow from "./CartItemRow";

const CartItemsListDesktop: React.FC<CartItemsListDesktopProps> = ({
  cartItems,
  quantities,
  selectedItems,
  onUpdateQuantity,
  onDeleteItem,
  setSelectedItems,
}) => {
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
          border: "1px solid #e0e0e0",
        }}
      >
        <CartDesktopHeader
          cartItems={cartItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        {cartItems.map((item) => (
          <CartItemRow
            key={item.cart_item_id}
            item={item}
            quantity={quantities[item.cart_item_id] || item.quantity}
            selected={selectedItems[item.cart_item_id] || false}
            onToggleSelect={(checked) =>
              setSelectedItems({
                ...selectedItems,
                [item.cart_item_id]: checked,
              })
            }
            onUpdateQuantity={onUpdateQuantity}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default CartItemsListDesktop;
