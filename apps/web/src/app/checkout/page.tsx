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
    return <div>Tidak ada item yang dipilih untuk checkout.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Checkout Pesanan</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Detail Pesanan</h2>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.cart_item_id} className="mb-2 border p-2">
              <div className="flex items-center">
                {item.product.product_img &&
                item.product.product_img.length > 0 ? (
                  <img
                    src={item.product.product_img[0].url}
                    alt={item.product.product_name}
                    className="mr-4 h-16 w-16 object-cover"
                  />
                ) : (
                  <div className="mr-4 h-16 w-16 bg-gray-100" />
                )}
                <div>
                  <p>{item.product.product_name}</p>
                  <p>Harga: Rp {item.product.product_price.toLocaleString()}</p>
                  <p>Jumlah: {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">
          Total Harga: Rp {totalPrice.toLocaleString()}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* dropdown alamat */}
        <div>
          <label className="mb-1 block font-semibold">
            Pilih Alamat Pengiriman
          </label>
          {addresses.length > 0 ? (
            <select
              value={selectedAddress || ""}
              onChange={(e) => setSelectedAddress(Number(e.target.value))}
              className="w-full rounded border p-2"
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? "Memproses pesanan…" : "Buat Pesanan"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
