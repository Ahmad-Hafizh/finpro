"use client";
import React, { useEffect, useState } from "react";

interface OrderItem {
  order_item_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
}

interface PaymentProof {
  payment_proof_id: number;
  image_url: string;
  uploaded_at: string;
  status: string;
}

interface Order {
  order_id: number;
  total_price: number;
  status: string;
  order_date: string;
  order_items: OrderItem[];
  payment_proof?: PaymentProof;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8090/order", {
        method: "GET",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengambil pesanan");
      }
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    const reason = prompt("Masukkan alasan pembatalan pesanan:");
    if (!reason) return;
    try {
      const res = await fetch(`http://localhost:8090/order/${orderId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal membatalkan pesanan");
      }
      alert("Pesanan berhasil dibatalkan.");
      fetchOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleConfirmOrder = async (orderId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8090/order/${orderId}/confirm`,
        {
          method: "POST",
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengkonfirmasi pesanan");
      }
      alert("Pesanan berhasil dikonfirmasi.");
      fetchOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Daftar Pesanan</h1>
      {loading && <p>Memuat pesanan...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !loading ? (
        <p>Tidak ada pesanan.</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} className="mb-4 border p-4">
            <p>
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p>
              <strong>Total Harga:</strong> Rp{" "}
              {order.total_price.toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Tanggal:</strong>{" "}
              {new Date(order.order_date).toLocaleString()}
            </p>
            {order.payment_proof && (
              <div className="mt-2">
                <p>
                  <strong>Bukti Pembayaran:</strong>
                </p>
                <img
                  src={order.payment_proof.image_url}
                  alt="Bukti Pembayaran"
                  className="w-40"
                />
              </div>
            )}
            <div className="mt-2">
              <p className="font-semibold">Item Pesanan:</p>
              <ul className="list-disc pl-5">
                {order.order_items.map((item) => (
                  <li key={item.order_item_id}>
                    Produk ID: {item.product_id} | Jumlah: {item.quantity} |
                    Subtotal: Rp {item.subtotal.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex space-x-2">
              {order.status === "menunggu_pembayaran" && (
                <button
                  onClick={() => handleCancelOrder(order.order_id)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Cancel Order
                </button>
              )}
              {order.status === "dikirim" && (
                <button
                  onClick={() => handleConfirmOrder(order.order_id)}
                  className="rounded bg-green-500 px-4 py-2 text-white"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderListPage;
