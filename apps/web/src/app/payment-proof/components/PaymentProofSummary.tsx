import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Grid from "@mui/material/Grid2";
import { OrderDetail } from "../[order_id]/page";

interface PaymentProofSummaryProps {
  orderDetail: OrderDetail;
}

const PaymentProofSummary: React.FC<PaymentProofSummaryProps> = ({
  orderDetail,
}) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <ReceiptIcon color="primary" sx={{ mr: 1 }} />
      <Typography variant="h6" color="text.primary">
        Payment summary
      </Typography>
    </Box>
    <Divider sx={{ mb: 3 }} />
    <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 1 }}>
      {orderDetail.order_items.map((item) => (
        <Card
          key={item.order_item_id}
          variant="outlined"
          sx={{ mb: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}
        >
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 3, sm: 2 }}>
                {item.product?.product_img?.length ? (
                  <img
                    src={item.product.product_img[0].url}
                    alt={item.product.product_name}
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      No Image
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid size={{ xs: 9, sm: 10 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.product?.product_name ||
                    "The product is not available."}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Chip
                    size="small"
                    label={`Qty: ${item.quantity}`}
                    sx={{ bgcolor: "primary.light", color: "primary.dark" }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Rp {item.subtotal.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        p: 2,
        mt: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600}>
        Subtotal
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        Rp {orderDetail.total_price.toLocaleString()}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        p: 2,
        mt: 1,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600}>
        Shipping
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        Rp {orderDetail.shipping_price?.toLocaleString() || "0"}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "background.paper",
        p: 2,
        mt: 1,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle1" fontWeight={600}>
        Total Payment
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        Rp {orderDetail.total_payment?.toLocaleString() || "0"}
      </Typography>
    </Box>
  </Box>
);

export default PaymentProofSummary;
