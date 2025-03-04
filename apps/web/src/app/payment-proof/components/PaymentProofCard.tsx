"use client";

import React, { useState, useEffect } from "react";
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
  CloudUpload as CloudUploadIcon,
  AccessTime as AccessTimeIcon,
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
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const orderTime = new Date(order.order_date).getTime();
    const deadline = orderTime + 3600000;

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [order.order_date]);

  const formatTime = (ms: number): string => {
    if (ms <= 0) return "Waktu habis";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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
            label="Waiting for Payment"
            color="warning"
            variant="outlined"
            sx={{ fontWeight: 500, borderWidth: 2 }}
          />
          <Typography variant="h6" fontWeight={700} color="primary.dark">
            Rp {order.total_price.toLocaleString()}
          </Typography>
        </Box>
        {order.status === "menunggu_pembayaran" && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={600}>
              {formatTime(remainingTime)}
            </Typography>
          </Box>
        )}
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
            Upload Payment Proof
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentProofCard;
