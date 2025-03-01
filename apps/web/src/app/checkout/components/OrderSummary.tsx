import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CartItem } from "../types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  loading: boolean;
  disableSubmit: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBackToCart: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  totalPrice,
  loading,
  disableSubmit,
  onSubmit,
  onBackToCart,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        position: "sticky",
        top: 24,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          bgcolor: "primary.main",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <PaymentIcon sx={{ color: "primary.main", mr: 1.5, fontSize: 24 }} />
        <Typography variant="h5" component="h2">
          Ringkasan Pembayaran
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="body1">
            Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            item)
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Rp {subtotal.toLocaleString()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalShippingIcon
              sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body1">Biaya Pengiriman</Typography>
          </Box>
          <Typography variant="body1" fontWeight={500}>
            Rp {shippingCost.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" fontWeight={700} color="primary.dark">
          Rp {totalPrice.toLocaleString()}
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={disableSubmit}
        onClick={onSubmit}
        sx={{
          py: 1.75,
          fontSize: "1.1rem",
          borderRadius: 2,
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Konfirmasi Pesanan"
        )}
      </Button>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="text"
          color="inherit"
          onClick={onBackToCart}
          sx={{ color: "text.secondary" }}
        >
          Kembali ke Keranjang
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
