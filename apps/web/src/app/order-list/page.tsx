"use client";
import React, { useEffect, useState } from "react";

interface OrderItem {
  order_item_id: number;
  product_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  product: {
    product_name: string;
    product_price: number;
    product_img?: { url: string }[];
  };
}

interface PaymentProof {
  payment_proof_id: number;
  image_url: string;
  uploaded_at: string;
  status: string;
}

interface Order {
  order_id: number;
  order_number?: string;
  total_price: number;
  status: string;
  order_date: string;
  order_items: OrderItem[];
  payment_proof?: PaymentProof;
}

const statuses = [
  { value: "menunggu_pembayaran", label: "Menunggu Pembayaran" },
  { value: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
  { value: "diproses", label: "Diproses" },
  { value: "dikirim", label: "Dikirim" },
  { value: "pesanan_dikonfirmasi", label: "Pesanan Dikonfirmasi" },
  { value: "dibatalkan", label: "Dibatalkan" },
];

const formatTime = (ms: number): string => {
  if (ms <= 0) return "Waktu habis";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(
    "menunggu_pembayaran",
  );
  const [searchDate, setSearchDate] = useState<string>("");
  const [searchOrderNumber, setSearchOrderNumber] = useState<string>("");

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchOrders = async (params?: {
    date?: string;
    order_number?: string;
  }) => {
    setLoading(true);
    try {
      let url = "http://localhost:8090/order";
      const queryParams: Record<string, string> = {};
      if (params) {
        if (params.date) queryParams.date = params.date;
        if (params.order_number) queryParams.order_number = params.order_number;
      }
      const queryString = new URLSearchParams(queryParams).toString();
      if (queryString) url = `${url}?${queryString}`;

      const res = await fetch(url, { method: "GET" });
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

  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus,
  );

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders({ date: searchDate, order_number: searchOrderNumber });
  };

  const handleReset = () => {
    setSearchDate("");
    setSearchOrderNumber("");
    fetchOrders();
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Daftar Pesanan</h1>

      {/* form Pencarian */}
      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
      >
        <div>
          <label
            htmlFor="orderNumber"
            className="block text-sm font-medium text-gray-700"
          >
            No Order:
          </label>
          <input
            id="orderNumber"
            type="text"
            value={searchOrderNumber}
            onChange={(e) => setSearchOrderNumber(e.target.value)}
            placeholder="Masukkan no order"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#57CC99] focus:ring focus:ring-[#57CC99] focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="orderDate"
            className="block text-sm font-medium text-gray-700"
          >
            Tanggal:
          </label>
          <input
            id="orderDate"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#57CC99] focus:ring focus:ring-[#57CC99] focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="rounded bg-[#57CC99] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#80ED99]"
          >
            Cari
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded bg-gray-400 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-500"
          >
            Reset Filter
          </button>
        </div>
      </form>

      {/* tab navigasi */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {statuses.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedStatus(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedStatus === tab.value
                ? "bg-[#57CC99] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Memuat pesanan...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {filteredOrders.length === 0 && !loading ? (
        <p className="text-center text-gray-600">
          Tidak ada pesanan untuk status ini.
        </p>
      ) : (
        filteredOrders.map((order) => {
          const deadline =
            new Date(order.order_date).getTime() + 60 * 60 * 1000;
          const remainingTime = deadline - currentTime;

          return (
            <div
              key={order.order_id}
              className="mb-4 rounded-lg border p-4 shadow-sm"
            >
              <p className="mb-1 text-lg font-semibold">
                Order Number:{" "}
                {order.order_number
                  ? order.order_number
                  : "order number doesn't exist"}
              </p>
              <p className="mb-1 text-lg font-semibold">
                Total Harga: Rp {order.total_price.toLocaleString()}
              </p>
              <p className="mb-1 text-gray-600">
                Status: {order.status.replace("_", " ")}
              </p>
              <p className="mb-3 text-gray-600">
                Tanggal: {new Date(order.order_date).toLocaleString()}
              </p>
              {/* countdown */}
              {order.status === "menunggu_pembayaran" && (
                <p className="mb-3 text-red-600">
                  Waktu pembayaran tersisa: {formatTime(remainingTime)}
                </p>
              )}
              {order.payment_proof && (
                <div className="mb-3">
                  <p className="font-semibold">Bukti Pembayaran:</p>
                  <img
                    src={order.payment_proof.image_url}
                    alt="Bukti Pembayaran"
                    className="w-40 rounded"
                  />
                </div>
              )}
              <div className="mb-3">
                <p className="font-semibold">Item Pesanan:</p>
                <ul className="list-disc pl-5">
                  {order.order_items.map((item) => (
                    <li key={item.order_item_id} className="text-gray-700">
                      <span>
                        {item.product?.product_name || "Produk tidak ditemukan"}
                      </span>{" "}
                      | Jumlah: {item.quantity} | Subtotal: Rp{" "}
                      {item.subtotal.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                {order.status === "menunggu_pembayaran" && (
                  <button
                    onClick={() => handleCancelOrder(order.order_id)}
                    className="rounded bg-[#22577A] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#2f78a8]"
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === "dikirim" && (
                  <button
                    onClick={() => handleConfirmOrder(order.order_id)}
                    className="rounded bg-[#22577A] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#2f78a8]"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderListPage;
