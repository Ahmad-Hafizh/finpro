"use client";

import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/navigation";
import { theme } from "../../../config/theme";

const EmptyCart: React.FC = () => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: "80px",
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              p: 6,
              borderRadius: 3,
              textAlign: "center",
              border: "1px solid #e0e0e0",
              bgcolor: "background.paper",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)",
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              There is no item to checkout
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
            >
              Please go back to cart and choose the products that you want to
              buy
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => router.push("/cart")}
              sx={{ px: 4, py: 1.5 }}
            >
              Back to Cart
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EmptyCart;
