import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface CartDesktopHeaderProps {
  cartItems: any[];
  selectedItems: { [key: number]: boolean };
  setSelectedItems: (selected: { [key: number]: boolean }) => void;
}

const CartDesktopHeader: React.FC<CartDesktopHeaderProps> = ({
  cartItems,
  selectedItems,
  setSelectedItems,
}) => {
  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems[item.cart_item_id]);
  const handleSelectAll = (checked: boolean) => {
    const updated = { ...selectedItems };
    cartItems.forEach((item) => {
      updated[item.cart_item_id] = checked;
    });
    setSelectedItems(updated);
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "grey.50",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Grid container alignItems="center">
        <Grid size={{ xs: 1 }}>
          <Checkbox
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            slotProps={{ input: { "aria-label": "select item" } }}
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Product
          </Typography>
        </Grid>
        <Grid size={{ xs: 4 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Name
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Unit Price
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Quantity
          </Typography>
        </Grid>
        <Grid size={{ xs: 1 }} sx={{ textAlign: "right" }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Total
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartDesktopHeader;
