import { Request, Response } from "express";
import prisma from "../prisma";

export class AdminOrderController {
  // get all orders
  async getAllOrders(req: Request, res: Response): Promise<any> {
    const userId = "2";
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
        include: { user: true },
      });
      if (!admin)
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      let whereClause: any = {};
      if (admin.user.role !== "super_admin") {
        whereClause.store_id = admin.store_id;
      } else {
        if (req.query.store_id) {
          whereClause.store_id = Number(req.query.store_id);
        }
      }

      const totalCount = await prisma.order.count({ where: whereClause });
      const totalPages = Math.ceil(totalCount / pageSize);
      const orders = await prisma.order.findMany({
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          order_items: { include: { product: true } },
          payment_proof: true,
          address: true,
          profile: true,
        },
      });

      return res.status(200).json({ orders, totalPages });
    } catch (error) {
      console.error("Get All Orders Error:", error);
      return res.status(500).json({ error: "Gagal mengambil data pesanan" });
    }
  }

  // confirm payment (manual transfer)
  async confirmPayment(req: Request, res: Response): Promise<any> {
    const userId = "4";
    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
      });
      if (!admin)
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const { order_id } = req.params;
      const { decision } = req.body; // decision: "approve" atau "reject"

      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
        include: { payment_proof: true },
      });
      if (!order)
        return res.status(404).json({ error: "Order tidak ditemukan" });
      if (!order.payment_proof)
        return res
          .status(400)
          .json({ error: "Bukti pembayaran tidak ditemukan" });

      if (decision === "approve") {
        await prisma.paymentProof.update({
          where: { payment_proof_id: order.payment_proof.payment_proof_id },
          data: { status: "approved" },
        });
        await prisma.order.update({
          where: { order_id: order.order_id },
          data: { status: "diproses" },
        });
      } else if (decision === "reject") {
        await prisma.paymentProof.update({
          where: { payment_proof_id: order.payment_proof.payment_proof_id },
          data: { status: "rejected" },
        });
        await prisma.order.update({
          where: { order_id: order.order_id },
          data: { status: "menunggu_pembayaran" },
        });
      } else {
        return res.status(400).json({ error: "Keputusan tidak valid" });
      }

      // catat aksi admin
      await prisma.adminOrder.create({
        data: {
          admin_id: admin.admin_id,
          order_id: order.order_id,
          action: "konfirmasi_pembayaran",
          action_time: new Date(),
        },
      });

      return res.status(200).json({
        message: `Pembayaran telah ${decision === "approve" ? "disetujui" : "ditolak"} dengan sukses`,
      });
    } catch (error) {
      console.error("Confirm Payment Error:", error);
      return res.status(500).json({ error: "Gagal mengkonfirmasi pembayaran" });
    }
  }

  // send user order
  async sendUserOrder(req: Request, res: Response): Promise<any> {
    const userId = "4";
    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
      });
      if (!admin) return res.status(404).json({ error: "Admin not found" });

      const { order_id } = req.params;
      const { tracking_number } = req.body;

      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order) return res.status(404).json({ error: "Order not found" });

      if (order.status !== "diproses") {
        return res.status(400).json({
          error: "Order is not in a state that can be sent",
        });
      }

      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: {
          status: "dikirim",
          tracking_number:
            tracking_number !== undefined
              ? tracking_number
              : order.tracking_number,
        },
      });

      await prisma.adminOrder.create({
        data: {
          admin_id: admin.admin_id,
          order_id: order.order_id,
          action: "kirim_pesanan",
          action_time: new Date(),
        },
      });

      return res.status(200).json({
        message: "Order status updated to 'dikirim'",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Send User Order Error:", error);
      return res.status(500).json({ error: "Failed to update order status" });
    }
  }

  // cancel user order
  async cancelUserOrder(req: Request, res: Response): Promise<any> {
    const userId = "4";
    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
      });
      if (!admin)
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const { order_id } = req.params;
      const { reason } = req.body;

      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
        include: { order_items: true },
      });
      if (!order)
        return res.status(404).json({ error: "Order tidak ditemukan" });

      // hanya bisa dibatalkan jika status order masih sebelum "dikirim"
      if (
        order.status === "dikirim" ||
        order.status === "pesanan_dikonfirmasi" ||
        order.status === "dibatalkan"
      ) {
        return res
          .status(400)
          .json({ error: "Order tidak dapat dibatalkan pada tahap ini" });
      }

      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: { status: "dibatalkan" },
      });

      // kmbalikan stok untuk tiap item pesanan dan buat jurnal stok
      for (const item of order.order_items) {
        const stock = await prisma.stock.findFirst({
          where: {
            product_id: item.product_id,
            store_id: order.store_id,
          },
        });
        if (stock) {
          await prisma.stock.update({
            where: { stock_id: stock.stock_id },
            data: { quantity: stock.quantity + item.quantity },
          });
          await prisma.stockJournal.create({
            data: {
              store_id: order.store_id,
              stock_id: stock.stock_id,
              product_id: item.product_id,
              quantity: item.quantity,
              type: "in",
              notes: `Order ${order.order_number || order.order_id} dibatalkan: ${reason || "Alasan tidak diberikan"}`,
              created_at: new Date(),
              stock_result: stock.quantity + item.quantity,
            },
          });
        }
      }

      await prisma.adminOrder.create({
        data: {
          admin_id: admin.admin_id,
          order_id: order.order_id,
          action: "batalkan_pesanan",
          action_time: new Date(),
        },
      });

      return res.status(200).json({
        message: "Order dibatalkan dan stok telah dikembalikan",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Cancel User Order Error:", error);
      return res.status(500).json({ error: "Gagal membatalkan order" });
    }
  }
}
