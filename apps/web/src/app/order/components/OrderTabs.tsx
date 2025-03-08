import React from "react";
import { Paper, Tabs, Tab, Badge, Box } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  Payments as PaymentsIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";

const statuses = [
  {
    value: "menunggu_pembayaran",
    label: "Waiting for Payment",
    icon: <PaymentsIcon fontSize="small" />,
  },
  {
    value: "menunggu_konfirmasi",
    label: "Waiting for Confirmation",
    icon: <AccessTimeIcon fontSize="small" />,
  },
  {
    value: "diproses",
    label: "Processed",
    icon: <AccessTimeIcon fontSize="small" />,
  },
  {
    value: "dikirim",
    label: "Shipped",
    icon: <ShippingIcon fontSize="small" />,
  },
  {
    value: "pesanan_dikonfirmasi",
    label: "Confirmed",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  {
    value: "dibatalkan",
    label: "Cancelled",
    icon: <CancelIcon fontSize="small" />,
  },
];

interface OrderTabsProps {
  selectedStatus: string;
  onStatusChange: (newStatus: string) => void;
  orderCounts: { [key: string]: number };
}

const OrderTabs: React.FC<OrderTabsProps> = ({
  selectedStatus,
  onStatusChange,
  orderCounts,
}) => {
  const currentIndex = statuses.findIndex((s) => s.value === selectedStatus);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onStatusChange(statuses[newValue].value);
  };
  return (
    <Paper sx={{ width: "100%", mb: 3, borderRadius: 3, overflow: "hidden" }}>
      <Tabs
        value={currentIndex === -1 ? 0 : currentIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {statuses.map((tab) => (
          <Tab
            key={tab.value}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.icon}
                <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
                  {tab.label}
                  {orderCounts[tab.value] > 0 && (
                    <Badge
                      badgeContent={orderCounts[tab.value]}
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              </Box>
            }
            sx={{
              minHeight: 56,
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              px: { xs: 1, md: 2 },
            }}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default OrderTabs;
