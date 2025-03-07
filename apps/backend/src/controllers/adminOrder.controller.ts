import { Request, Response } from "express";
import prisma from "../prisma";
import { getAllOrdersService } from "../services/adminOrder/getAllOrder";
import { confirmPaymentService } from "../services/adminOrder/confirmPayment";
import { sendUserOrderService } from "../services/adminOrder/sendUserOrder";
import { cancelUserOrderService } from "../services/adminOrder/cancelUserOrder";

export class AdminOrderController {
  async getAllOrders(req: Request, res: Response): Promise<any> {
    if (!res.locals.user)
      return res.status(401).json({ error: "Unauthorized" });
    const { id: userId, role } = res.locals.user as {
      id: string;
      role: string;
    };

    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
        include: { user: true },
      });
      if (!admin && role !== "super_admin")
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const result = await getAllOrdersService({ admin, query: req.query });
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Get All Orders Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Gagal mengambil data pesanan" });
    }
  }

  async confirmPayment(req: Request, res: Response): Promise<any> {
    if (!res.locals.user)
      return res.status(401).json({ error: "Unauthorized" });
    const { id: userId, role } = res.locals.user as {
      id: string;
      role: string;
    };

    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
        include: { user: true },
      });
      if (!admin && role !== "super_admin")
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const { order_id } = req.params;
      const { decision } = req.body;

      const message = await confirmPaymentService({
        admin,
        order_id,
        decision,
      });
      return res.status(200).json({ message });
    } catch (error: any) {
      console.error("Confirm Payment Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Gagal mengkonfirmasi pembayaran" });
    }
  }

  async sendUserOrder(req: Request, res: Response): Promise<any> {
    if (!res.locals.user)
      return res.status(401).json({ error: "Unauthorized" });
    const { id: userId, role } = res.locals.user as {
      id: string;
      role: string;
    };

    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
        include: { user: true },
      });
      if (!admin && role !== "super_admin")
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const { order_id } = req.params;
      const { tracking_number } = req.body;

      const updatedOrder = await sendUserOrderService({
        admin,
        order_id,
        tracking_number,
      });
      return res.status(200).json({
        message: "Order status updated to 'dikirim'",
        order: updatedOrder,
      });
    } catch (error: any) {
      console.error("Send User Order Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to update order status" });
    }
  }

  async cancelUserOrder(req: Request, res: Response): Promise<any> {
    if (!res.locals.user)
      return res.status(401).json({ error: "Unauthorized" });
    const { id: userId, role } = res.locals.user as {
      id: string;
      role: string;
    };

    try {
      const admin = await prisma.admin.findUnique({
        where: { user_id: userId },
        include: { user: true },
      });
      if (!admin && role !== "super_admin")
        return res.status(404).json({ error: "Admin tidak ditemukan" });

      const { order_id } = req.params;
      const { reason } = req.body;

      const updatedOrder = await cancelUserOrderService({
        admin,
        order_id,
        reason,
      });
      return res.status(200).json({
        message: "Order dibatalkan dan stok telah dikembalikan",
        order: updatedOrder,
      });
    } catch (error: any) {
      console.error("Cancel User Order Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Gagal membatalkan order" });
    }
  }
}
