"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  cart_item_id: number;
  quantity: number;
  product: {
    product_id: number;
    product_name: string;
    product_price: number;
    product_img?: { url: string }[];
  };
}

interface Address {
  address_id: number;
  street: string;
  city: string;
  province: string;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const items = localStorage.getItem("selectedCartItems");
    if (items) {
      try {
        const parsed = JSON.parse(items);
        setSelectedItems(parsed);
      } catch (err) {
        console.error("Error parsing selectedCartItems", err);
      }
    }
  }, []);

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.product.product_price * item.quantity,
    0,
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("http://localhost:8090/address");
        if (!res.ok) {
          throw new Error("Gagal mengambil data alamat");
        }
        const data = await res.json();
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddress(data[0].address_id);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchAddresses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError("Pilih alamat pengiriman");
      return;
    }
    setError(null);
    setLoading(true);

    const payload = {
      address_id: Number(selectedAddress),
      total_price: totalPrice,
      products: selectedItems.map((item) => ({
        product_id: item.product.product_id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("http://localhost:8090/order/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal membuat pesanan");
      }
      const createdOrder = await res.json();
      localStorage.removeItem("selectedCartItems");
      router.push(`/payment-proof/${createdOrder.order_id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-4">
        <p className="text-xl text-gray-600">
          Tidak ada item yang dipilih untuk checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#57CC99]">
          Checkout Pesanan
        </h1>
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Detail Pesanan
          </h2>
          <ul className="space-y-4">
            {selectedItems.map((item) => (
              <li
                key={item.cart_item_id}
                className="flex items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                {item.product.product_img &&
                item.product.product_img.length > 0 ? (
                  <img
                    src={item.product.product_img[0].url}
                    alt={item.product.product_name}
                    className="mr-4 h-20 w-20 rounded object-cover"
                  />
                ) : (
                  <div className="mr-4 h-20 w-20 rounded bg-gray-100" />
                )}
                <div className="flex-1">
                  <p className="mb-1 text-lg font-semibold text-gray-800">
                    {item.product.product_name}
                  </p>
                  <p className="text-gray-600">
                    Harga: Rp {item.product.product_price.toLocaleString()}
                  </p>
                  <p className="text-gray-600">Jumlah: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-2xl font-bold text-gray-800">
            Total Harga: Rp {totalPrice.toLocaleString()}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-lg font-semibold text-gray-800">
              Pilih Alamat Pengiriman
            </label>
            {addresses.length > 0 ? (
              <select
                value={selectedAddress || ""}
                onChange={(e) => setSelectedAddress(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-[#57CC99] focus:ring focus:ring-[#57CC99] focus:ring-opacity-50"
                required
              >
                {addresses.map((address) => (
                  <option key={address.address_id} value={address.address_id}>
                    {address.street}, {address.city}, {address.province}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada alamat. Silahkan tambahkan alamat terlebih dahulu.
              </p>
            )}
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#57CC99] py-3 text-center text-xl font-semibold text-white transition-colors duration-200 hover:bg-[#80ED99]"
          >
            {loading ? "Memproses pesanan…" : "Buat Pesanan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
