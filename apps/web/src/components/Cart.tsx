"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Plus, Minus, Trash2, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchCartItems,
  fetchCartCount,
  updateCartItemQuantity,
  deleteCartItem,
} from "@/store/cartSlice";
import { useCart } from "@/contexts/CartContext";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartVersion } = useCart();
  const {
    items: cartItems,
    loading,
    count: cartCount,
  } = useSelector((state: RootState) => state.cart);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const refreshCartData = async () => {
    try {
      await Promise.all([
        dispatch(fetchCartItems()).unwrap(),
        dispatch(fetchCartCount()).unwrap(),
      ]);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  useEffect(() => {
    refreshCartData();
  }, [dispatch, cartVersion]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "cartVersion" && e.newValue) {
        refreshCartData();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch]);

  useEffect(() => {
    const newQuantities: { [key: number]: number } = {};
    const newSelectedItems: { [key: number]: boolean } = {};
    cartItems.forEach((item) => {
      newQuantities[item.cart_item_id] = item.quantity;
      newSelectedItems[item.cart_item_id] =
        selectedItems[item.cart_item_id] || false;
    });
    setQuantities(newQuantities);
    setSelectedItems(newSelectedItems);
  }, [cartItems]);

  const handleUpdateQuantity = async (
    cart_item_id: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    try {
      setQuantities((prev) => ({ ...prev, [cart_item_id]: newQuantity }));
      await dispatch(
        updateCartItemQuantity({ cart_item_id, quantity: newQuantity }),
      ).unwrap();
      await refreshCartData();
    } catch (error) {
      setQuantities((prev) => ({
        ...prev,
        [cart_item_id]: quantities[cart_item_id],
      }));
      alert("Failed to update quantity");
    }
  };

  const handleDeleteItem = async (cart_item_id: number) => {
    try {
      await dispatch(deleteCartItem(cart_item_id)).unwrap();
      await refreshCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const handleProceedToCheckout = () => {
    const itemsToCheckout = cartItems.filter(
      (item) => selectedItems[item.cart_item_id],
    );
    alert(
      `Proceeding to checkout with items: ${itemsToCheckout
        .map((item) => item.product.product_name)
        .join(", ")}`,
    );
  };

  const selectedTotal = cartItems.reduce((sum, item) => {
    if (selectedItems[item.cart_item_id]) {
      return sum + item.product.product_price * item.quantity;
    }
    return sum;
  }, 0);

  const groupedItems = cartItems.reduce(
    (acc: { [key: string]: typeof cartItems }, item) => {
      const storeName = item.store_name ?? "Unknown Store";
      if (!acc[storeName]) {
        acc[storeName] = [];
      }
      acc[storeName].push(item);
      return acc;
    },
    {} as { [key: string]: typeof cartItems },
  );

  const isGroupSelected = (storeName: string) => {
    const itemsInGroup = groupedItems[storeName] || [];
    return itemsInGroup.every((item) => selectedItems[item.cart_item_id]);
  };

  const handleSelectGroup = (storeName: string, isSelected: boolean) => {
    const updatedSelectedItems = { ...selectedItems };
    (groupedItems[storeName] || []).forEach((item) => {
      updatedSelectedItems[item.cart_item_id] = isSelected;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const handleSelectAll = (isSelected: boolean) => {
    const updatedSelectedItems: { [key: number]: boolean } = {};
    cartItems.forEach((item) => {
      updatedSelectedItems[item.cart_item_id] = isSelected;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItems[item.cart_item_id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#80ED99]"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white p-4 font-sans md:p-8">
      {/* MOBILE LAYOUT */}
      <div className="mx-auto max-w-4xl md:hidden">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-[#80ED99]" />
            <h1 className="text-2xl font-normal text-black">
              Your Cart ({cartCount})
            </h1>
          </div>
          {Object.keys(groupedItems).map((storeName) => (
            <div key={storeName} className="mb-6">
              <div className="flex items-center bg-gray-100 p-2">
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5"
                  checked={isGroupSelected(storeName)}
                  onChange={(e) =>
                    handleSelectGroup(storeName, e.target.checked)
                  }
                />
                <Store className="mr-2 h-5 w-5" />
                <span className="font-medium">{storeName}</span>
              </div>
              <div className="mt-2 space-y-4">
                {groupedItems[storeName].map((item) => (
                  <Card key={item.cart_item_id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="mr-2 h-5 w-5"
                          checked={selectedItems[item.cart_item_id] || false}
                          onChange={(e) =>
                            setSelectedItems({
                              ...selectedItems,
                              [item.cart_item_id]: e.target.checked,
                            })
                          }
                        />
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          {item.product.product_img &&
                          item.product.product_img.length > 0 ? (
                            <img
                              src={item.product.product_img[0].url}
                              alt={item.product.product_name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                              <ShoppingCart className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-lg font-medium">
                            {item.product.product_name}
                          </h3>
                          <span className="block text-gray-600">
                            Price: Rp{" "}
                            {(
                              item.product.product_price *
                              (quantities[item.cart_item_id] || item.quantity)
                            ).toLocaleString()}
                          </span>
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center overflow-hidden rounded-lg border">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    Math.max(
                                      1,
                                      (quantities[item.cart_item_id] ||
                                        item.quantity) - 1,
                                    ),
                                  )
                                }
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <Input
                                type="number"
                                min="1"
                                value={
                                  quantities[item.cart_item_id] || item.quantity
                                }
                                onChange={(e) => {
                                  const newQty = Math.max(
                                    1,
                                    parseInt(e.target.value) || 1,
                                  );
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    newQty,
                                  );
                                }}
                                className="w-16 border-0 text-center focus:ring-0"
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    (quantities[item.cart_item_id] ||
                                      item.quantity) + 1,
                                  )
                                }
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                handleDeleteItem(item.cart_item_id)
                              }
                              className="ml-4 text-[#80ED99]"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="mx-auto hidden max-w-4xl md:block">
        <div className="mb-6 flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-[#80ED99]" />
          <h1 className="text-2xl font-normal text-black">
            Your Cart ({cartCount})
          </h1>
        </div>
        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg text-gray-600">Your cart is empty</p>
              <Button className="mt-4 bg-[#80ED99] text-black hover:bg-[#60cd79]">
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          Object.keys(groupedItems).map((storeName) => (
            <div key={storeName} className="mb-6 rounded-lg border">
              <div className="flex items-center border-b bg-gray-100 p-2">
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5"
                  checked={isGroupSelected(storeName)}
                  onChange={(e) =>
                    handleSelectGroup(storeName, e.target.checked)
                  }
                />
                <Store className="mr-2 h-5 w-5" />
                <span className="font-medium">{storeName}</span>
              </div>
              {(groupedItems[storeName] || []).map((item) => (
                <div
                  key={item.cart_item_id}
                  className="flex items-center border-b p-4 last:border-0"
                >
                  <input
                    type="checkbox"
                    className="mr-4 h-5 w-5"
                    checked={selectedItems[item.cart_item_id] || false}
                    onChange={(e) =>
                      setSelectedItems({
                        ...selectedItems,
                        [item.cart_item_id]: e.target.checked,
                      })
                    }
                  />
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                    {item.product.product_img &&
                    item.product.product_img.length > 0 ? (
                      <img
                        src={item.product.product_img[0].url}
                        alt={item.product.product_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-medium text-gray-800">
                      {item.product.product_name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Price: Rp {item.product.product_price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.cart_item_id,
                          Math.max(
                            1,
                            (quantities[item.cart_item_id] || item.quantity) -
                              1,
                          ),
                        )
                      }
                      className="rounded-l border border-gray-300 p-2"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <Input
                      type="number"
                      min="1"
                      value={quantities[item.cart_item_id] || item.quantity}
                      onChange={(e) => {
                        const newQty = Math.max(
                          1,
                          parseInt(e.target.value) || 1,
                        );
                        handleUpdateQuantity(item.cart_item_id, newQty);
                      }}
                      className="w-16 border-0 text-center focus:ring-0"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.cart_item_id,
                          (quantities[item.cart_item_id] || item.quantity) + 1,
                        )
                      }
                      className="rounded-r border border-gray-300 p-2"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="ml-4 w-32 text-right font-medium">
                    Rp{" "}
                    {(
                      item.product.product_price *
                      (quantities[item.cart_item_id] || item.quantity)
                    ).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.cart_item_id)}
                    className="ml-4 text-[#80ED99]"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* MOBILE CHECKOUT SUMMARY */}
      <div className="fixed inset-x-0 bottom-0 z-10 md:hidden">
        <Card className="mx-4 mb-4">
          <CardContent className="flex items-center justify-between p-4">
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">
                Rp {selectedTotal.toLocaleString()}
              </span>
              <Button
                onClick={handleProceedToCheckout}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* DESKTOP CHECKOUT SUMMARY */}
      <div className="fixed bottom-0 left-0 right-0 z-10 hidden w-full md:block">
        <div className="flex divide-x divide-gray-300 border border-t-2">
          <div className="flex-1 bg-white py-4 text-center">
            <span className="text-lg font-bold">
              Total: Rp {selectedTotal.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="flex-1 bg-[#80ED99] py-4 text-center font-semibold text-gray-600 hover:bg-[#60cd79] hover:text-gray-50"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
