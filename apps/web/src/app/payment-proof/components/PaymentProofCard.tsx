import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  Payment as PaymentIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";

interface Order {
  order_id: number;
  total_price: number;
  status: string;
  order_date: string;
}

interface PaymentProofCardProps {
  order: Order;
  formatDate: (dateString: string) => string;
  onUpload: () => void;
}

const PaymentProofCard: React.FC<PaymentProofCardProps> = ({
  order,
  formatDate,
  onUpload,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 0 } }}
          >
            <CalendarTodayIcon
              sx={{ color: "text.secondary", mr: 1, fontSize: 18 }}
            />
            <Typography variant="body2" color="text.secondary">
              Tanggal Order:
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight={500}>
            {formatDate(order.order_date)}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label="Menunggu Pembayaran"
            color="warning"
            variant="outlined"
            sx={{ fontWeight: 500, borderWidth: 2 }}
          />
          <Typography variant="h6" fontWeight={700} color="primary.dark">
            Rp {order.total_price.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<CloudUploadIcon />}
            onClick={onUpload}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Upload Bukti Pembayaran
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentProofCard;
