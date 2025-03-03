"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@mui/material/styles";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import { theme } from "../../config/theme";
import OrderDetails from "./components/OrderDetails";
import ShippingAddress from "./components/ShippingAddress";
import OrderSummary from "./components/OrderSummary";
import EmptyCart from "./components/EmptyCart";
import { CartItem, Address } from "./types";
import { calculateSubtotal } from "./utils";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep] = useState(1);

  const subtotal = calculateSubtotal(selectedItems);
  const shippingCost = 15000;
  const totalPrice = subtotal + shippingCost;

  useEffect(() => {
    loadCartItems();
    fetchAddresses();
  }, []);
  const loadCartItems = () => {
    const items = localStorage.getItem("selectedCartItems");
    if (items) {
      try {
        setSelectedItems(JSON.parse(items));
      } catch (err) {
        console.error("Error parsing selectedCartItems", err);
      }
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await callAPI.get("/address");
      setAddresses(response.data);
      if (response.data && response.data.length > 0) {
        setSelectedAddress(response.data[0].address_id);
      }
    } catch (err: any) {
      console.error("Error fetching addresses:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleAddressChange = (addressId: number | "") => {
    setSelectedAddress(addressId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError("Pilih alamat pengiriman");
      return;
    }

    setError(null);
    setLoading(true);

    const payload = {
      address_id: Number(selectedAddress),
      total_price: totalPrice,
      shipping_price: shippingCost,
      products: selectedItems.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await callAPI.post("/order/new", payload);
      const createdOrder = response.data;

      localStorage.removeItem("selectedCartItems");

      toast({
        title: "Pesanan berhasil dibuat",
        description: "Anda akan diarahkan ke halaman pembayaran",
        variant: "default",
      });

      router.push(`/payment-proof/${createdOrder.order_id}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);

      toast({
        title: "Gagal membuat pesanan",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  if (selectedItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          pt: "80px",
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 2, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "primary.dark", mb: 1 }}
            >
              Checkout
            </Typography>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ mt: 3, display: { xs: "none", md: "flex" } }}
            >
              <Step>
                <StepLabel>Keranjang</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pengiriman</StepLabel>
              </Step>
              <Step>
                <StepLabel>Pembayaran</StepLabel>
              </Step>
            </Stepper>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7 }}>
              <OrderDetails items={selectedItems} />
              <ShippingAddress
                addresses={addresses}
                selectedAddress={selectedAddress}
                onAddressChange={handleAddressChange}
                onAddNewAddress={() => router.push("/address/new")}
                error={error}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <OrderSummary
                items={selectedItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalPrice={totalPrice}
                loading={loading}
                onSubmit={handleSubmit}
                disableSubmit={loading || selectedAddress === ""}
                onBackToCart={() => router.push("/cart")}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutPage;
