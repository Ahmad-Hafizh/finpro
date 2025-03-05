"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from "@/config/axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../config/theme";
import Navbar from "@/components/global/Nav";
import PaymentProofCard from "./components/PaymentProofCard";

interface Order {
  order_id: number;
  total_price: number;
  status: string;
  order_date: string;
}

const PaymentProofListPage: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await callAPI.get("/order");
      const data = response.data;
      const pendingOrders = data.filter(
        (order: Order) => order.status === "menunggu_pembayaran",
      );
      setOrders(pendingOrders);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Navbar />
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
            <Box sx={{ textAlign: "center", mb: 5, pt: 2 }}>
              <Typography variant="h4" color="primary.dark" gutterBottom>
                Order Waiting for Payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload payment proof for orders that is not paid yet
              </Typography>
            </Box>
            {loading && (
              <Stack spacing={3}>
                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #e0e0e0",
                      overflow: "hidden",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6">Loading...</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {!loading && orders.length === 0 && (
              <Box sx={{ textAlign: "center", py: 6, px: 2 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  There is no order that should be paid
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </Button>
              </Box>
            )}
            {!loading && orders.length > 0 && (
              <Grid container spacing={3}>
                {orders.map((order) => (
                  <Grid size={12} key={order.order_id}>
                    <PaymentProofCard
                      order={order}
                      formatDate={formatDate}
                      onUpload={() =>
                        router.push(`/payment-proof/${order.order_id}`)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentProofListPage;
