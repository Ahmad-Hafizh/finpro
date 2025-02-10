"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductImg {
  url: string;
}

interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  product_img?: ProductImg[];
}

interface CartItem {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  product: Product;
  subtotal: number;
  store_name?: string;
}

interface CartResponse {
  items: CartItem[];
  total: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchCartItems = async () => {
    try {
      const res = await fetch("http://localhost:8090/cart/items");
      const data: CartResponse = await res.json();
      if (res.ok) {
        setCartItems(data.items);
        setCartTotal(data.total);
        const initialQuantities: { [key: number]: number } = {};
        data.items.forEach((item: CartItem) => {
          initialQuantities[item.cart_item_id] = item.quantity;
        });
        setQuantities(initialQuantities);
        setSelectedItems((prev) => {
          const newSelected: { [key: number]: boolean } = { ...prev };
          data.items.forEach((item: CartItem) => {
            if (newSelected[item.cart_item_id] === undefined) {
              newSelected[item.cart_item_id] = false;
            }
          });
          return newSelected;
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:8090/cart/count");
      const data = await res.json();
      if (res.ok) {
        setCartCount(data.count);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchCartCount();
  }, []);

  const handleUpdateQuantity = async (
    cart_item_id: number,
    newQuantity: number
  ): Promise<boolean> => {
    try {
      const res = await fetch(`http://localhost:8090/cart/${cart_item_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Failed to update quantity");
        return false;
      }
      await fetchCartItems();
      await fetchCartCount();
      return true;
    } catch (error) {
      console.error("Update error:", error);
      alert("Update error: " + error);
      return false;
    }
  };

  const handleDeleteItem = async (cart_item_id: number) => {
    try {
      const res = await fetch(`http://localhost:8090/cart/${cart_item_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchCartItems();
        await fetchCartCount();
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Delete error:", error);
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
      return sum + item.subtotal;
    }
    return sum;
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#80ED99]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 relative pb-32 font-sans">
      <div className="max-w-4xl mx-auto">
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
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.cart_item_id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2 text-lg font-medium text-gray-800 break-words">
                      <Store className="w-5 h-5" />
                      <span>{item.store_name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.cart_item_id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center">
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
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-600">
                          Subtotal: Rp {item.subtotal.toLocaleString()}
                        </span>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={async () => {
                              const prevQty = quantities[item.cart_item_id];
                              const newQty = Math.max(1, prevQty - 1);
                              setQuantities({
                                ...quantities,
                                [item.cart_item_id]: newQty,
                              });
                              const success = await handleUpdateQuantity(
                                item.cart_item_id,
                                newQty
                              );
                              if (!success) {
                                setQuantities({
                                  ...quantities,
                                  [item.cart_item_id]: prevQty,
                                });
                              }
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <Input
                            type="number"
                            min="1"
                            value={quantities[item.cart_item_id]}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              setQuantities({
                                ...quantities,
                                [item.cart_item_id]: newQty,
                              });
                            }}
                            className="w-16 text-center border-0 focus:ring-0"
                          />
                          <button
                            onClick={async () => {
                              const prevQty = quantities[item.cart_item_id];
                              const newQty = prevQty + 1;
                              setQuantities({
                                ...quantities,
                                [item.cart_item_id]: newQty,
                              });
                              const success = await handleUpdateQuantity(
                                item.cart_item_id,
                                newQty
                              );
                              if (!success) {
                                setQuantities({
                                  ...quantities,
                                  [item.cart_item_id]: prevQty,
                                });
                              }
                            }}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="fixed left-0 right-0  bottom-[100px] md:bottom-0 z-10 w-full">
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
