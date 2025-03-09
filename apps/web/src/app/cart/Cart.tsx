/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/lib/redux/store";
import {
  fetchCartItems,
  fetchCartCount,
  updateCartItemQuantity,
  deleteCartItem,
} from "@/lib/redux/reducers/cartSlice";
import { useCart } from "@/contexts/CartContext";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, CircularProgress } from "@mui/material";
import { theme } from "../../config/theme";
import CartHeader from "./components/CartHeader";
import CartItemsList from "./components/CartItemList";
import CartCheckoutBar from "./components/CartCheckoutBar";
import { Session } from "next-auth";

interface CartProps {
  session: Session;
}

const Cart: React.FC<CartProps> = ({ session }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { cartVersion } = useCart();
  const token = session.user.auth_token;

  const {
    items: cartItems,
    loading,
    count: cartCount,
  } = useSelector((state: RootState) => state.cart);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const mappedCartItems = cartItems.map((item) => ({
    ...item,
    product: {
      ...item.product,
      product_img: item.product.product_img?.map((img) => ({
        image_url: img.url,
      })),
    },
  }));

  const refreshCartData = async () => {
    try {
      await Promise.all([
        dispatch(fetchCartItems({ token })).unwrap(),
        dispatch(fetchCartCount({ token })).unwrap(),
      ]);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  useEffect(() => {
    refreshCartData();
  }, [dispatch, cartVersion, token]);

  useEffect(() => {
    const newQuantities: { [key: number]: number } = {};
    const newSelected: { [key: number]: boolean } = {};
    cartItems.forEach((item) => {
      newQuantities[item.cart_item_id] = item.quantity;
      newSelected[item.cart_item_id] =
        selectedItems[item.cart_item_id] || false;
    });
    setQuantities(newQuantities);
    setSelectedItems(newSelected);
  }, [cartItems]);

  const handleUpdateQuantity = async (
    cart_item_id: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    try {
      setQuantities((prev) => ({ ...prev, [cart_item_id]: newQuantity }));
      await dispatch(
        updateCartItemQuantity({ cart_item_id, quantity: newQuantity, token }),
      ).unwrap();
      await refreshCartData();
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const handleDeleteItem = async (cart_item_id: number) => {
    try {
      await dispatch(deleteCartItem({ cart_item_id, token })).unwrap();
      await refreshCartData();
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  const handleProceedToCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (item) => selectedItems[item.cart_item_id],
    );
    if (itemsToCheckout.length === 0) {
      alert("Choose item to checkout.");
      return;
    }
    localStorage.setItem("selectedCartItems", JSON.stringify(itemsToCheckout));
    router.push("/checkout");
  };

  const selectedTotal = cartItems.reduce((sum, item) => {
    if (selectedItems[item.cart_item_id]) {
      return sum + item.product.product_price * item.quantity;
    }
    return sum;
  }, 0);

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems[item.cart_item_id]);

  const toggleAllItems = (checked: boolean) => {
    const updated = { ...selectedItems };
    cartItems.forEach((item) => {
      updated[item.cart_item_id] = checked;
    });
    setSelectedItems(updated);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          pb: { xs: 10, md: 12 },
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 4, pb: { xs: 2, md: 4 } }}>
          <CartHeader cartCount={cartCount} />
          <CartItemsList
            cartItems={mappedCartItems}
            quantities={quantities}
            selectedItems={selectedItems}
            onUpdateQuantity={handleUpdateQuantity}
            onDeleteItem={handleDeleteItem}
            setSelectedItems={setSelectedItems}
          />
          <CartCheckoutBar
            allSelected={allSelected}
            selectedTotal={selectedTotal}
            onToggleAll={toggleAllItems}
            onCheckout={handleProceedToCheckout}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Cart;
