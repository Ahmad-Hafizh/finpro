import React from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

interface CartCheckoutBarProps {
  allSelected: boolean;
  selectedTotal: number;
  onToggleAll: (checked: boolean) => void;
  onCheckout: () => void;
}

const CartCheckoutBar: React.FC<CartCheckoutBarProps> = ({
  allSelected,
  selectedTotal,
  onToggleAll,
  onCheckout,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "block",
          zIndex: 10,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={allSelected}
              onChange={(e) => onToggleAll(e.target.checked)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" sx={{ mr: 1 }}>
              All
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total:
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.dark"
              >
                Rp {selectedTotal.toLocaleString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={onCheckout}
              size="large"
              disabled={selectedTotal === 0}
            >
              Checkout
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 10,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 2,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Checkbox
            checked={allSelected}
            onChange={(e) => onToggleAll(e.target.checked)}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body1" fontWeight={500}>
            Select All
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 3, textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary">
              Total Payment:
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary.dark">
              Rp {selectedTotal.toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={onCheckout}
            size="large"
            disabled={selectedTotal === 0}
            sx={{ py: 1.5, px: 4, fontSize: "1rem" }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CartCheckoutBar;
