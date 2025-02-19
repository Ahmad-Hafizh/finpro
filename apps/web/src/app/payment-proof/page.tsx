"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  order_id: number;
  total_price: number;
  status: string;
  order_date: string;
}

const PaymentProofListPage: React.FC = () => {
  const router = useRouter();
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
        throw new Error(data.error || "Gagal mengambil order");
      }
      const data = await res.json();
      const pendingOrders = data.filter(
        (order: Order) => order.status === "menunggu_pembayaran",
      );
      setOrders(pendingOrders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Order Menunggu Pembayaran</h1>
      {loading && <p>Memuat order...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !loading ? (
        <p>Tidak ada order yang membutuhkan pembayaran.</p>
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
              <strong>Tanggal:</strong>{" "}
              {new Date(order.order_date).toLocaleString()}
            </p>
            <button
              onClick={() => router.push(`/payment-proof/${order.order_id}`)}
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Upload Bukti Pembayaran
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentProofListPage;
