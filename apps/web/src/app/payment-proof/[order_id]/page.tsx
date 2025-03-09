/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { callAPI } from "@/config/axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../config/theme";
import PaymentProofSummary from "../components/PaymentProofSummary";
import PaymentProofForm from "../components/PaymentProofForm";
import { useSession } from "next-auth/react";

export interface OrderDetail {
  order_id: number;
  order_number: string;
  total_price: number;
  shipping_price: number;
  total_payment: number;
  order_items: {
    order_item_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
      product_id: number;
      product_name: string;
      product_price: number;
      product_img?: { image_url: string }[];
    };
  }[];
  discounts?: {
    shippingDiscount: number;
    voucherDiscount: number;
    totalSavings: number;
  };
  free_item?: {
    product: {
      product_id: number;
      product_name: string;
      product_price: number;
      product_img?: { url: string }[];
    };
    quantity: number;
  };
}

const PaymentProofUploadPage: React.FC = () => {
  const router = useRouter();
  const params = useParams() as { order_id: string };
  const orderId = params.order_id;
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    const fetchOrderDetails = async () => {
      try {
        const token = session?.user?.auth_token;
        if (!token) {
          setError("Token not available");
          return;
        }
        const response = await callAPI.get(`/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrderDetail(response.data);
      } catch (err: any) {
        const errData = err.response?.data?.error;
        const errorMessage =
          typeof errData === "object" && errData !== null
            ? errData.message
            : errData || err.message;
        setError(errorMessage);
      }
    };
    fetchOrderDetails();
  }, [orderId, session, status]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          pt: { xs: "80px", md: "80px" },
        }}
      >
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "8px",
                bgcolor: "primary.main",
              }}
            />
            <Box sx={{ textAlign: "center", mb: 4, pt: 2 }}>
              <Typography variant="h4" color="primary.dark" gutterBottom>
                Upload Payment Proof
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Number: #
                {orderDetail?.order_number || "Order number is not available."}
              </Typography>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {orderDetail ? (
              <>
                <PaymentProofSummary orderDetail={orderDetail} />
                <Divider sx={{ my: 4 }} />
                <PaymentProofForm orderId={orderId} />
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentProofUploadPage;
