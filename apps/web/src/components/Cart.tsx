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
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    try {
      setQuantities((prev) => ({ ...prev, [cart_item_id]: newQuantity }));
      await dispatch(
        updateCartItemQuantity({ cart_item_id, quantity: newQuantity })
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
      (item) => selectedItems[item.cart_item_id]
    );
    alert(
      `Proceeding to checkout with items: ${itemsToCheckout
        .map((item) => item.product.product_name)
        .join(", ")}`
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
    {} as { [key: string]: typeof cartItems }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#80ED99]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans relative">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-8 h-8 text-[#80ED99]" />
            <h1 className="text-2xl font-normal text-black">
              Your Cart ({cartCount})
            </h1>
          </div>
          {Object.keys(groupedItems).map((storeName) => (
            <div key={storeName} className="mb-6">
              <div className="flex items-center bg-gray-100 p-2">
                <input
                  type="checkbox"
                  className="mr-2 w-5 h-5"
                  checked={isGroupSelected(storeName)}
                  onChange={(e) =>
                    handleSelectGroup(storeName, e.target.checked)
                  }
                />
                <Store className="w-5 h-5 mr-2" />
                <span className="font-medium">{storeName}</span>
              </div>
              <div className="space-y-4 mt-2">
                {groupedItems[storeName].map((item) => (
                  <Card key={item.cart_item_id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="mr-2 w-5 h-5"
                          checked={selectedItems[item.cart_item_id] || false}
                          onChange={(e) =>
                            setSelectedItems({
                              ...selectedItems,
                              [item.cart_item_id]: e.target.checked,
                            })
                          }
                        />
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.product.product_img &&
                          item.product.product_img.length > 0 ? (
                            <img
                              src={item.product.product_img[0].url}
                              alt={item.product.product_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <ShoppingCart className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-lg font-medium">
                            {item.product.product_name}
                          </h3>
                          <span className="text-gray-600 block">
                            Price: Rp{" "}
                            {(
                              item.product.product_price *
                              (quantities[item.cart_item_id] || item.quantity)
                            ).toLocaleString()}
                          </span>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    Math.max(
                                      1,
                                      (quantities[item.cart_item_id] ||
                                        item.quantity) - 1
                                    )
                                  )
                                }
                                className="p-2 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
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
                                    parseInt(e.target.value) || 1
                                  );
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    newQty
                                  );
                                }}
                                className="w-16 text-center border-0 focus:ring-0"
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.cart_item_id,
                                    (quantities[item.cart_item_id] ||
                                      item.quantity) + 1
                                  )
                                }
                                className="p-2 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() =>
                                handleDeleteItem(item.cart_item_id)
                              }
                              className="ml-4 text-[#80ED99]"
                            >
                              <Trash2 className="w-5 h-5" />
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
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-8 h-8 text-[#80ED99]" />
          <h1 className="text-2xl font-normal text-black">
            Your Cart ({cartCount})
          </h1>
        </div>
        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-600">Your cart is empty</p>
              <Button className="mt-4 bg-[#80ED99] hover:bg-[#60cd79] text-black">
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          Object.keys(groupedItems).map((storeName) => (
            <div key={storeName} className="mb-6 border rounded-lg">
              <div className="flex items-center bg-gray-100 p-2 border-b">
                <input
                  type="checkbox"
                  className="mr-2 w-5 h-5"
                  checked={isGroupSelected(storeName)}
                  onChange={(e) =>
                    handleSelectGroup(storeName, e.target.checked)
                  }
                />
                <Store className="w-5 h-5 mr-2" />
                <span className="font-medium">{storeName}</span>
              </div>
              {(groupedItems[storeName] || []).map((item) => (
                <div
                  key={item.cart_item_id}
                  className="flex items-center p-4 border-b last:border-0"
                >
                  <input
                    type="checkbox"
                    className="mr-4 w-5 h-5"
                    checked={selectedItems[item.cart_item_id] || false}
                    onChange={(e) =>
                      setSelectedItems({
                        ...selectedItems,
                        [item.cart_item_id]: e.target.checked,
                      })
                    }
                  />
                  <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product.product_img &&
                    item.product.product_img.length > 0 ? (
                      <img
                        src={item.product.product_img[0].url}
                        alt={item.product.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 ml-4">
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
                            (quantities[item.cart_item_id] || item.quantity) - 1
                          )
                        )
                      }
                      className="p-2 border border-gray-300 rounded-l"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <Input
                      type="number"
                      min="1"
                      value={quantities[item.cart_item_id] || item.quantity}
                      onChange={(e) => {
                        const newQty = Math.max(
                          1,
                          parseInt(e.target.value) || 1
                        );
                        handleUpdateQuantity(item.cart_item_id, newQty);
                      }}
                      className="w-16 text-center border-0 focus:ring-0"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.cart_item_id,
                          (quantities[item.cart_item_id] || item.quantity) + 1
                        )
                      }
                      className="p-2 border border-gray-300 rounded-r"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-32 text-right font-medium ml-4">
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
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* CHECKOUT SUMMARY */}
      <div className="fixed left-0 right-0 bottom-[100px] md:bottom-0 z-10 w-full">
        <div className="flex divide-x divide-gray-300 border border-t-2">
          <div className="flex-1 py-4 text-center bg-white">
            <span className="text-lg font-bold">
              Total: Rp {selectedTotal.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="flex-1 py-4 text-center bg-[#80ED99] hover:bg-[#60cd79] text-gray-600 hover:text-gray-50 font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
