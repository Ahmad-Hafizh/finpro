"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { callAPI } from "@/config/axios";
import { useToast } from "@/hooks/use-toast";
import theme from "./theme";
import OrderFilters from "./components/OrderFilters";
import OrderTabs from "./components/OrderTabs";
import OrderCard from "./components/OrderCard";
import CancelOrderDialog from "./components/CancelOrderDialog";
import ConfirmOrderDialog from "./components/ConfirmOrderDialog";
import ImagePreviewDialog from "./components/ImagePreviewDialog";
const OrderListPage: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("menunggu_pembayaran");
  const [searchParams, setSearchParams] = useState({
    date: "",
    orderNumber: "",
  });
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    orderId: null as number | null,
    reason: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    orderId: null as number | null,
  });
  const [imageDialog, setImageDialog] = useState({ open: false, imageUrl: "" });
  const fetchOrders = async (params = {}) => {
    setLoading(true);
    try {
      const response = await callAPI.get("/order", { params });
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const orderCounts = orders.reduce(
    (counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    },
    {} as { [key: string]: number },
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: { xs: 3, md: 5 }, color: "primary.dark" }}
          >
            Daftar Pesanan
          </Typography>
          <OrderFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={() => fetchOrders(searchParams)}
            onReset={() => {
              setSearchParams({ date: "", orderNumber: "" });
              fetchOrders();
            }}
          />
          <OrderTabs
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            orderCounts={orderCounts}
          />
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {!loading &&
            orders.filter((order) => order.status === selectedStatus).length ===
              0 && (
              <Paper
                sx={{
                  p: 5,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Belum ada pesanan {selectedStatus.replace(/_/g, " ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pesanan akan muncul disini ketika statusnya berubah
                </Typography>
              </Paper>
            )}
          <Stack spacing={3}>
            {orders
              .filter((order) => order.status === selectedStatus)
              .map((order) => (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  expanded={expandedOrderId === order.order_id}
                  onToggle={() =>
                    setExpandedOrderId(
                      expandedOrderId === order.order_id
                        ? null
                        : order.order_id,
                    )
                  }
                  onCancel={() =>
                    setCancelDialog({
                      open: true,
                      orderId: order.order_id,
                      reason: "",
                    })
                  }
                  onConfirm={() =>
                    setConfirmDialog({ open: true, orderId: order.order_id })
                  }
                  onImageClick={(url) =>
                    setImageDialog({ open: true, imageUrl: url })
                  }
                />
              ))}
          </Stack>
        </Container>
      </Box>
      <CancelOrderDialog
        open={cancelDialog.open}
        orderId={cancelDialog.orderId}
        reason={cancelDialog.reason}
        onReasonChange={(reason) =>
          setCancelDialog({ ...cancelDialog, reason })
        }
        onClose={() =>
          setCancelDialog({ open: false, orderId: null, reason: "" })
        }
        onCancelOrder={async () => {
          if (!cancelDialog.orderId || !cancelDialog.reason.trim()) return;
          setLoading(true);
          try {
            await callAPI.post(
              `/order/${cancelDialog.orderId}/cancel`,
              { reason: cancelDialog.reason },
              { headers: { "Content-Type": "application/json" } },
            );
            toast({
              title: "Pesanan dibatalkan",
              description: "Pesanan berhasil dibatalkan.",
            });
            fetchOrders();
            setCancelDialog({ open: false, orderId: null, reason: "" });
          } catch (err: any) {
            toast({
              title: "Gagal membatalkan pesanan",
              description: err.response?.data?.error || err.message,
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }}
      />
      <ConfirmOrderDialog
        open={confirmDialog.open}
        orderId={confirmDialog.orderId}
        onClose={() => setConfirmDialog({ open: false, orderId: null })}
        onConfirmOrder={async () => {
          if (!confirmDialog.orderId) return;
          setLoading(true);
          try {
            await callAPI.post(`/order/${confirmDialog.orderId}/confirm`);
            toast({
              title: "Pesanan dikonfirmasi",
              description: "Pesanan berhasil dikonfirmasi.",
            });
            fetchOrders();
            setConfirmDialog({ open: false, orderId: null });
          } catch (err: any) {
            toast({
              title: "Gagal mengkonfirmasi pesanan",
              description: err.response?.data?.error || err.message,
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }}
      />
      <ImagePreviewDialog
        open={imageDialog.open}
        imageUrl={imageDialog.imageUrl}
        onClose={() => setImageDialog({ open: false, imageUrl: "" })}
      />
    </ThemeProvider>
  );
};
export default OrderListPage;
