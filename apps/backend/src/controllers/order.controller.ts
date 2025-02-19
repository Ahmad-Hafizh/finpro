import { Request, Response } from "express";
import { prisma } from "../../../../packages/database/src/client";
import { uploadImage } from "../utils/cloudinary";

export class OrderController {
  // create a new order
  async createOrder(req: Request, res: Response): Promise<any> {
    const userId = "1";
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { address_id, products, total_price } = req.body;
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
      }

      const address = await prisma.address.findFirst({
        where: {
          address_id: Number(address_id),
          profile_id: profile.profile_id,
        },
      });
      if (!address) return res.status(404).json({ error: "Address not found" });

      for (const item of products) {
        const stock = await prisma.stock.findFirst({
          where: { product_id: Number(item.product_id) },
        });
        if (!stock || stock.quantity < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for product ${item.product_id}`,
          });
        }
      }

      const nearestStore = await prisma.store.findFirst();
      if (!nearestStore)
        return res.status(400).json({ error: "No store available" });

      const order = await prisma.order.create({
        data: {
          store_id: nearestStore.store_id,
          address_id: address.address_id,
          total_price: total_price || 0,
          status: "menunggu_pembayaran",
          order_date: new Date(),
          profile_id: profile.profile_id,
          order_items: {
            create: products.map((item: any) => ({
              product_id: Number(item.product_id),
              quantity: Number(item.quantity),
              price: 0,
              subtotal: 0,
            })),
          },
        },
        include: { order_items: true },
      });

      for (const item of order.order_items) {
        const product = await prisma.product.findUnique({
          where: { product_id: item.product_id },
        });
        if (product) {
          await prisma.orderItem.update({
            where: { order_item_id: item.order_item_id },
            data: {
              price: product.product_price,
              subtotal: product.product_price * item.quantity,
            },
          });
        }
      }

      const updatedOrderItems = await prisma.orderItem.findMany({
        where: { order_id: order.order_id },
      });
      const total = updatedOrderItems.reduce(
        (sum, curr) => sum + curr.subtotal,
        0
      );
      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: { total_price: total },
      });

      return res.status(201).json(updatedOrder);
    } catch (error) {
      console.error("Create Order Error:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  // upload payment proof, cloudinary
  async uploadPaymentProof(req: Request, res: Response): Promise<any> {
    try {
      const { order_id } = req.params;
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const uploadedResult = await uploadImage(req.file.path);
      const imageUrl = uploadedResult.secure_url;

      const paymentProof = await prisma.paymentProof.create({
        data: {
          order_id: Number(order_id),
          image_url: imageUrl,
          uploaded_at: new Date(),
          status: "pending",
        },
      });

      await prisma.order.update({
        where: { order_id: Number(order_id) },
        data: { status: "menunggu_konfirmasi" },
      });

      return res.status(200).json({
        message: "Payment proof uploaded successfully",
        paymentProof,
      });
    } catch (error) {
      console.error("Upload Payment Proof Error:", error);
      return res.status(500).json({ error: "Failed to upload payment proof" });
    }
  }

  // get order list
  async getOrderList(req: Request, res: Response): Promise<any> {
    const userId = "1";
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { date, order_id } = req.query;
      let whereClause: any = { profile_id: profile.profile_id };

      if (order_id) whereClause.order_id = Number(order_id);
      if (date) {
        const start = new Date(date as string);
        const end = new Date(date as string);
        end.setDate(end.getDate() + 1);
        whereClause.order_date = { gte: start, lt: end };
      }

      const orders = await prisma.order.findMany({
        where: whereClause,
        include: { order_items: true, payment_proof: true },
      });
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Get Order List Error:", error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  }

  // cancel order before payment proof upload
  async cancelOrder(req: Request, res: Response): Promise<any> {
    const userId = "1";
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { order_id } = req.params;
      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order || order.profile_id !== profile.profile_id) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.status !== "menunggu_pembayaran") {
        return res
          .status(400)
          .json({ error: "Order cannot be canceled at this stage" });
      }

      const { reason } = req.body;
      await prisma.orderCancel.create({
        data: {
          order_id: order.order_id,
          reason: reason || "User canceled the order",
          canceled_at: new Date(),
        },
      });

      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: { status: "dibatalkan" },
      });
      return res.status(200).json({
        message: "Order canceled successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Cancel Order Error:", error);
      return res.status(500).json({ error: "Failed to cancel order" });
    }
  }

  // confirm order receipt
  async confirmOrder(req: Request, res: Response): Promise<any> {
    const userId = "1";
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: "Profile not found" });

      const { order_id } = req.params;
      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order || order.profile_id !== profile.profile_id) {
        return res.status(404).json({ error: "Order not found" });
      }
      if (order.status !== "dikirim") {
        return res
          .status(400)
          .json({ error: "Order cannot be confirmed at this stage" });
      }

      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: { status: "pesanan_dikonfirmasi" },
      });
      return res.status(200).json({
        message: "Order confirmed successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Confirm Order Error:", error);
      return res.status(500).json({ error: "Failed to confirm order" });
    }
  }
}
