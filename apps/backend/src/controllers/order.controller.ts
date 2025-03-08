import { Request, Response } from "express";
import prisma from "../prisma";
import { createOrderService } from "../services/order/createOrder";
import { uploadPaymentProofService } from "../services/order/uploadPaymentProof";
import { getOrderListService } from "../services/order/getOrderList";
import { cancelOrderService } from "../services/order/cancelOrder";
import { confirmOrderService } from "../services/order/confirmOrder";
import { getOrderByIdService } from "../services/order/getOrderById";
import { autoCancelOrdersService } from "../services/order/autoCancelOrders";
import { autoConfirmOrdersService } from "../services/order/autoConfirmOrders";

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
      const {
        address_id,
        products,
        shipping_price,
        voucherType,
        // voucher_id,
        voucher_code,
      } = req.body;
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
      }
      const order = await createOrderService({
        userId,
        address_id: Number(address_id),
        products,
        shipping_price,
        voucherType,
        // voucher_id,
        voucher_code,
      });
      return res.status(201).json(order);
    } catch (error: any) {
      console.error("Create Order Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to create order" });
    }
  }

  async uploadPaymentProof(req: Request, res: Response): Promise<any> {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    try {
      const { order_id } = req.params;
      const result = await uploadPaymentProofService({
        order_id: Number(order_id),
        filePath: req.file.path,
      });
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Upload Payment Proof Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to upload payment proof" });
    }
  }

  async getOrderList(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { date, order_id } = req.query;
      const orders = await getOrderListService({
        profile_id: profile.profile_id,
        date: date as string,
        order_id: order_id ? Number(order_id) : undefined,
      });
      return res.status(200).json(orders);
    } catch (error: any) {
      console.error("Get Order List Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to fetch orders" });
    }
  }

  async cancelOrder(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { order_id } = req.params;
      const { reason } = req.body;
      const canceledOrder = await cancelOrderService({
        profile_id: profile.profile_id,
        order_id: Number(order_id),
        reason,
      });
      return res.status(200).json({
        message: "Order canceled successfully and stock has been returned",
        order: canceledOrder,
      });
    } catch (error: any) {
      console.error("Cancel Order Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to cancel order" });
    }
  }

  async confirmOrder(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { order_id } = req.params;
      const updatedOrder = await confirmOrderService({
        profile_id: profile.profile_id,
        order_id: Number(order_id),
      });
      return res.status(200).json({
        message: "Order confirmed successfully",
        order: updatedOrder,
      });
    } catch (error: any) {
      console.error("Confirm Order Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to confirm order" });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<any> {
    const userId = res.locals.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { order_id } = req.params;
      const order = await getOrderByIdService(
        profile.profile_id,
        Number(order_id)
      );
      return res.status(200).json(order);
    } catch (error: any) {
      console.error("Get Order By Id Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to fetch order details" });
    }
  }

  async autoCancelOrders(): Promise<void> {
    try {
      await autoCancelOrdersService();
    } catch (error) {
      console.error("Error in autoCancelOrders:", error);
    }
  }

  async autoConfirmOrders(): Promise<void> {
    try {
      await autoConfirmOrdersService();
    } catch (error) {
      console.error("Error in autoConfirmOrders:", error);
    }
  }
}
