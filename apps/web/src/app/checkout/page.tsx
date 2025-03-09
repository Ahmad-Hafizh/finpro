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
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep] = useState(1);
  const [voucherType, setVoucherType] = useState<
    "ongkir" | "payment" | "product" | ""
  >("");
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string>("");
  const [availableVouchers, setAvailableVouchers] = useState<any[]>([]);
  const [storeId, setStoreId] = useState<number | null>(null);

  const subtotal = calculateSubtotal(selectedItems);
  const [shippingCost, setShippingCost] = useState(0);
  const [courier, setCourier] = useState("");
  const totalPrice = subtotal + shippingCost;

  const session = useSession();

  useEffect(() => {
    const fetchNearestStore = async (lat: number, lng: number) => {
      try {
        const response = await callAPI.get("/store/get-store", {
          params: { lat, lng },
        });
        console.log("Nearest Store Response:", response.data);
        setStoreId(response.data.result.store_id);
      } catch (error) {
        console.error("Error fetching nearest store", error);
        setStoreId(8);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Coordinates:", latitude, longitude);
          fetchNearestStore(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStoreId(8);
        },
      );
    } else {
      setStoreId(8);
    }
  }, [session]);

  useEffect(() => {
    loadCartItems();
    if (session.status === "authenticated" && session.data) {
      fetchAddresses();
    }
  }, [session]);

  useEffect(() => {
    console.log("Voucher Type:", voucherType, "Store ID:", storeId);
    if (voucherType && storeId) {
      const fetchVouchers = async () => {
        try {
          const token = session?.data?.user.auth_token;
          const response = await callAPI.get("/voucher/available", {
            headers: { Authorization: `Bearer ${token}` },
            params: { type: voucherType, store_id: storeId },
          });
          console.log("Voucher Response:", response.data);
          const vouchers = response.data.result
            ? response.data.result
            : response.data;
          let data = vouchers;
          if (voucherType === "product") {
            const productIds = selectedItems.map(
              (item) => item.product.product_id,
            );
            data = vouchers.filter((voucher: any) =>
              productIds.includes(voucher.product_id),
            );
          }
          setAvailableVouchers(data);
        } catch (error) {
          console.error("Error fetching vouchers", error);
        }
      };
      fetchVouchers();
    } else {
      setAvailableVouchers([]);
      setSelectedVoucherCode("");
    }
  }, [voucherType, session, storeId, selectedItems]);

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

  const handleVoucherChange = (value: string) => {
    if (voucherType === "payment") {
      const voucher = availableVouchers.find(
        (v: any) => (v.voucher_code || v.voucher_store_code) === value,
      );
      if (voucher && subtotal < voucher.minimum_buy) {
        toast({
          title: "Voucher Error",
          description: `Minimum purchase for this voucher is Rp ${voucher.minimum_buy.toLocaleString()}.`,
          variant: "destructive",
        });
        setSelectedVoucherCode("");
        return;
      }
    }
    setSelectedVoucherCode(value);
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
      voucher_code: selectedVoucherCode || undefined,
      store_id: storeId || undefined,
    };

    console.log("Payload:", payload);
    try {
      const token = session?.data?.user.auth_token;
      const response = await callAPI.post("/order/new", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const createdOrder = response.data;
      console.log("Created Order:", createdOrder);
      localStorage.removeItem("selectedCartItems");
      toast({
        title: "Order is created successfully",
        description: "You will be directed to payment page",
        variant: "default",
      });
      const orderId = createdOrder.order_id || createdOrder.order?.order_id;
      if (!orderId) {
        throw new Error("Order ID not found in response");
      }
      router.push(`/payment-proof/${orderId}`);
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
                error={error}
              />
              <ShippingCourier
                selectedAddress={selectedAddress}
                selectedCourier={courier}
                onSelectCourier={handleSelectOngkir}
                error={error}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="voucher-type-label">Voucher Type</InputLabel>
                  <Select
                    labelId="voucher-type-label"
                    id="voucher-type-select"
                    value={voucherType}
                    label="Voucher Type"
                    onChange={(e) => {
                      setVoucherType(
                        e.target.value as "ongkir" | "payment" | "product" | "",
                      );
                      setSelectedVoucherCode("");
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="ongkir">Shipping Voucher</MenuItem>
                    <MenuItem value="payment">Payment Voucher</MenuItem>
                    <MenuItem value="product">
                      Product Voucher (Buy 1 Get 1)
                    </MenuItem>
                  </Select>
                </FormControl>
                {voucherType && (
                  <FormControl fullWidth>
                    <InputLabel id="voucher-select-label">
                      Select Voucher
                    </InputLabel>
                    <Select
                      labelId="voucher-select-label"
                      id="voucher-select"
                      value={selectedVoucherCode}
                      label="Select Voucher"
                      onChange={(e) =>
                        handleVoucherChange(e.target.value as string)
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {availableVouchers.map((voucher: any) => (
                        <MenuItem
                          key={
                            voucher.voucher_code ||
                            voucher.voucher_ongkir_code ||
                            voucher.voucher_store_code ||
                            voucher.voucher_product_code
                          }
                          value={
                            voucher.voucher_code ||
                            voucher.voucher_ongkir_code ||
                            voucher.voucher_store_code ||
                            voucher.voucher_product_code
                          }
                        >
                          {voucher.voucher_code ||
                            voucher.voucher_ongkir_code ||
                            voucher.voucher_store_code ||
                            voucher.voucher_product_code}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
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
