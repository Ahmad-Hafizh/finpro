import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
  quantity: number;
  selected: boolean;
  onToggleSelect: (checked: boolean) => void;
  onUpdateQuantity: (cart_item_id: number, newQuantity: number) => void;
  onDeleteItem: (cart_item_id: number) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  quantity,
  selected,
  onToggleSelect,
  onUpdateQuantity,
  onDeleteItem,
}) => {
  const hasImage =
    item.product.product_img &&
    Array.isArray(item.product.product_img) &&
    item.product.product_img.length > 0 &&
    item.product.product_img[0]?.image_url;

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Grid container alignItems="center">
        <Grid size={{ xs: 1 }}>
          <Checkbox
            checked={selected}
            onChange={(e) => onToggleSelect(e.target.checked)}
            slotProps={{ input: { "aria-label": "select item" } }}
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "grey.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {hasImage ? (
              <img
                src={item.product.product_img?.[0]?.image_url}
                alt={item.product.product_name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <ShoppingBagIcon sx={{ fontSize: 32, color: "text.disabled" }} />
            )}
          </Box>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            {item.product.product_name}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }} sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Rp {item.product.product_price.toLocaleString()}
          </Typography>
        </Grid>
        <Grid size={{ xs: 2 }} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1.5,
              width: "fit-content",
              mx: "auto",
            }}
          >
            <IconButton
              size="small"
              onClick={() =>
                onUpdateQuantity(item.cart_item_id, Math.max(1, quantity - 1))
              }
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => {
                const newQty = Math.max(1, parseInt(e.target.value) || 1);
                onUpdateQuantity(item.cart_item_id, newQty);
              }}
              variant="standard"
              slotProps={{
                htmlInput: {
                  min: 1,
                  style: {
                    textAlign: "center",
                    width: "40px",
                    padding: "4px 0",
                  },
                },
              }}
              sx={{
                "& .MuiInput-underline:before": { borderBottom: "none" },
                "& .MuiInput-underline:after": { borderBottom: "none" },
              }}
            />
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.cart_item_id, quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 1 }} sx={{ textAlign: "right" }}>
          <Typography variant="subtitle1" fontWeight={600} color="primary.dark">
            Rp {(item.product.product_price * quantity).toLocaleString()}
          </Typography>
        </Grid>
        <Grid size={{ xs: 1 }} sx={{ textAlign: "center" }}>
          <IconButton
            color="error"
            size="small"
            onClick={() => onDeleteItem(item.cart_item_id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItemRow;
