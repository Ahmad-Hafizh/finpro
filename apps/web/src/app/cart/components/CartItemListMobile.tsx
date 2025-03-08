import React from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";
import { CartItemsListMobileProps } from "../types";

const CartItemsListMobile: React.FC<CartItemsListMobileProps> = ({
  cartItems,
  quantities,
  selectedItems,
  onUpdateQuantity,
  onDeleteItem,
  setSelectedItems,
}) => {
  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <Stack spacing={2}>
        {cartItems.map((item) => {
          const hasImage =
            item.product.product_img &&
            Array.isArray(item.product.product_img) &&
            item.product.product_img.length > 0 &&
            item.product.product_img[0]?.image_url;
          return (
            <Card
              key={item.cart_item_id}
              sx={{ borderRadius: 3, overflow: "hidden" }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Checkbox
                    checked={selectedItems[item.cart_item_id] || false}
                    onChange={(e) =>
                      setSelectedItems({
                        ...selectedItems,
                        [item.cart_item_id]: e.target.checked,
                      })
                    }
                    slotProps={{ input: { "aria-label": "select item" } }}
                  />
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: "hidden",
                      bgcolor: "grey.100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {hasImage ? (
                      <img
                        src={item.product.product_img?.[0]?.image_url}
                        alt={item.product.product_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <ShoppingBagIcon
                        sx={{ fontSize: 32, color: "text.disabled" }}
                      />
                    )}
                  </Box>
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600} noWrap>
                      {item.product.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Rp {item.product.product_price.toLocaleString()}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1.5,
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            onUpdateQuantity(
                              item.cart_item_id,
                              Math.max(
                                1,
                                (quantities[item.cart_item_id] ||
                                  item.quantity) - 1,
                              ),
                            )
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          value={quantities[item.cart_item_id] || item.quantity}
                          onChange={(e) => {
                            const newQty = Math.max(
                              1,
                              parseInt(e.target.value) || 1,
                            );
                            onUpdateQuantity(item.cart_item_id, newQty);
                          }}
                          variant="standard"
                          slotProps={{
                            htmlInput: {
                              min: 1,
                              style: {
                                textAlign: "center",
                                width: "40px",
                                padding: "4px 0",
                              },
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottom: "none",
                            },
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() =>
                            onUpdateQuantity(
                              item.cart_item_id,
                              (quantities[item.cart_item_id] || item.quantity) +
                                1,
                            )
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDeleteItem(item.cart_item_id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color="primary.dark"
                      sx={{ mt: 1, textAlign: "right" }}
                    >
                      Rp{" "}
                      {(
                        item.product.product_price *
                        (quantities[item.cart_item_id] || item.quantity)
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default CartItemsListMobile;
