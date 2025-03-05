import React from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { CartItem } from "../types";

interface OrderDetailsProps {
  items: CartItem[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ items }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        mb: 3,
        border: "1px solid #e0e0e0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          bgcolor: "primary.main",
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <ReceiptLongIcon
          sx={{ color: "primary.main", mr: 1.5, fontSize: 24 }}
        />
        <Typography variant="h5" component="h2">
          Order Detail
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          maxHeight: { xs: "300px", md: "400px" },
          overflowY: "auto",
          pr: 1,
        }}
      >
        {items.map((item) => (
          <Card
            key={item.cart_item_id}
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 4, sm: 3 }}>
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: 2,
                      overflow: "hidden",
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.product.product_img &&
                    item.product.product_img.length > 0 ? (
                      <Box
                        component="img"
                        src={item.product.product_img[0].url}
                        alt={item.product.product_name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <ShoppingCartCheckoutIcon
                        sx={{ color: "text.disabled", fontSize: 24 }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid size={{ xs: 8, sm: 9 }}>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {item.product.product_name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        mt: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Price: Rp{" "}
                          {item.product.product_price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Amount: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary.dark"
                        sx={{ mt: { xs: 1, sm: 0 } }}
                      >
                        Rp{" "}
                        {(
                          item.product.product_price * item.quantity
                        ).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default OrderDetails;
