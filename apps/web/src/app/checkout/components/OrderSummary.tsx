import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { CartItem } from "../types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  disableSubmit: boolean;
  onBackToCart: () => void;
  discount?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  totalPrice,
  loading,
  onSubmit,
  disableSubmit,
  onBackToCart,
  discount = 0,
}) => {
  return (
    <Paper elevation={2}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Subtotal ({items.length} items)</Typography>
            <Typography>Rp{subtotal.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Shipping</Typography>
            <Typography>Rp{shippingCost.toLocaleString()}</Typography>
          </Box>

          {discount > 0 && (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Discount</Typography>
              <Typography color="success.main">
                -Rp{discount.toLocaleString()}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              fontWeight: "bold",
            }}
          >
            <Typography fontWeight="bold">Total</Typography>
            <Typography fontWeight="bold">
              Rp{totalPrice.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={onSubmit}
            disabled={disableSubmit}
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue to Payment"
            )}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onBackToCart}
            disabled={loading}
          >
            Back to Cart
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
