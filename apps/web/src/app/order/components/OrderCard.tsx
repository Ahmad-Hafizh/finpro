import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Collapse,
  Avatar,
  List,
  ListItem,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccessTime as AccessTimeIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { formatTime, useCountdown } from "../utils";
import { Order, OrderCardProps } from "../types";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  expanded,
  onToggle,
  onCancel,
  onConfirm,
  onImageClick,
}) => {
  const orderTime = new Date(order.order_date).getTime();
  const deadline = orderTime + 3600000;
  const remainingTime = useCountdown(deadline);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            borderBottom: expanded ? "1px solid #e0e0e0" : "none",
            cursor: "pointer",
          }}
          onClick={onToggle}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 8, sm: 6, md: 4 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {order.order_number || `Order #${order.order_id}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(order.order_date)}
                </Typography>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 4, sm: 2, md: 2 }}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-end", md: "flex-start" },
              }}
            >
              <Chip
                label={order.status.replace(/_/g, " ")}
                color={
                  order.status === "dibatalkan"
                    ? "error"
                    : order.status === "pesanan_dikonfirmasi"
                      ? "success"
                      : "primary"
                }
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 4, md: 3 }}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                Total: Rp {order.total_price.toLocaleString()}
              </Typography>
            </Grid>
            {order.status === "menunggu_pembayaran" && (
              <Grid
                size={{ xs: 8, sm: 6, md: 2 }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AccessTimeIcon
                  fontSize="small"
                  color={remainingTime > 600000 ? "primary" : "error"}
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={remainingTime > 600000 ? "primary.main" : "error"}
                >
                  {formatTime(remainingTime)}
                </Typography>
              </Grid>
            )}
            <Grid
              size={{ xs: 4, sm: 6, md: 1 }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {expanded ? (
                <ExpandLessIcon color="action" />
              ) : (
                <ExpandMoreIcon color="action" />
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              mt: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={600} color="text.secondary">
              Total: Rp {order.total_price.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ px: 3, py: 2, bgcolor: "rgba(0,0,0,0.02)" }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Order Item:
            </Typography>
            <List disablePadding sx={{ mb: 3 }}>
              {order.order_items.map((item) => (
                <ListItem
                  key={item.order_item_id}
                  disablePadding
                  sx={{
                    mb: 1,
                    py: 1,
                    px: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          variant="rounded"
                          src={item.product?.product_img?.[0]?.url}
                          alt={item.product?.product_name}
                          sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            bgcolor: "grey.200",
                          }}
                        >
                          {item.product?.product_name?.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {item.product?.product_name || "Product not found"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: {
                            xs: "space-between",
                            sm: "flex-end",
                          },
                          alignItems: "center",
                          mt: { xs: 1, sm: 0 },
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: { xs: 0, sm: 3 } }}
                        >
                          {item.quantity} x Rp {item.price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          Rp {item.subtotal.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            {order.payment_proof && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                  Payment Proof:
                </Typography>
                <Box
                  component="img"
                  src={order.payment_proof.image_url}
                  alt="Payment Proof"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 2,
                    cursor: "pointer",
                    border: "1px solid #e0e0e0",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() =>
                    onImageClick(order.payment_proof?.image_url || "")
                  }
                />
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Uploaded at:{" "}
                  {new Date(order.payment_proof.uploaded_at).toLocaleString()}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              {order.status === "menunggu_pembayaran" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onCancel}
                  startIcon={<CancelIcon />}
                >
                  Cancel Order
                </Button>
              )}
              {order.status === "dikirim" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onConfirm}
                  startIcon={<CheckCircleIcon />}
                >
                  Confirm Delivery
                </Button>
              )}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
