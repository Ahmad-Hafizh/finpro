/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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
import { useSession } from "next-auth/react";
import ShippingCourier from "./components/ShippingCourier";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep] = useState(1);
  const [voucherType, setVoucherType] = useState<"ongkir" | "payment" | "">("");
  const [voucherCode, setVoucherCode] = useState("");

  const subtotal = calculateSubtotal(selectedItems);
  const [shippingCost, setShippingCost] = useState(0);
  const [courier, setCourier] = useState("");
  const totalPrice = subtotal + shippingCost;

  const session = useSession();

  useEffect(() => {
    loadCartItems();
    if (session.status === "authenticated" && session.data) {
      fetchAddresses();
    }
  }, [session]);

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
      const token = session?.data?.user.auth_token;
      const response = await callAPI.get("/address/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(response.data.result);
      if (response.data.result && response.data.result.length > 0) {
        setSelectedAddress(response.data.result[0].address_id);
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
      setError("Choose delivery address");
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
      voucherType: voucherType || undefined,
      voucher_code: voucherCode || undefined,
    };

    try {
      const token = session?.data?.user.auth_token;
      const response = await callAPI.post("/order/new", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const createdOrder = response.data;

      localStorage.removeItem("selectedCartItems");

      toast({
        title: "Order is created successfully",
        description: "You will be directed to payment page",
        variant: "default",
      });

      router.push(`/payment-proof/${createdOrder.order_id}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);

      toast({
        title: "Failed to create order",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOngkir = (courier: string, cost: number) => {
    setCourier(courier);
    setShippingCost(cost);
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
                <StepLabel>Cart</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipping</StepLabel>
              </Step>
              <Step>
                <StepLabel>Payment</StepLabel>
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
                // onAddNewAddress={() => router.push("/address/new")}
                error={error}
              />
              <ShippingCourier
                // addresses={addresses}
                selectedAddress={selectedAddress}
                // onAddressChange={handleAddressChange}
                selectedCourier={courier}
                onSelectCourier={handleSelectOngkir}
                error={error}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="voucher-type-label">Voucher Type</InputLabel>
                  <Select
                    labelId="voucher-type-label"
                    id="voucher-type-select"
                    value={voucherType}
                    label="Voucher Type"
                    onChange={(e) =>
                      setVoucherType(
                        e.target.value as "ongkir" | "payment" | "",
                      )
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="ongkir">Shipping Voucher</MenuItem>
                    <MenuItem value="payment">Payment Voucher</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Voucher Code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  sx={{ mt: 2 }}
                />
              </Box>
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
