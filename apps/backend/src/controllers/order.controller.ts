import { Request, Response } from 'express';
import { prisma } from '../../../../packages/database/src/client';
import { uploadImage } from '../utils/cloudinary';

const generateOrderNumber = (date: Date): string => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const datePrefix = `${yyyy}${mm}${dd}`;
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  return `${datePrefix}${randomDigits}`;
};
export class OrderController {
  // create a new order
  async createOrder(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      const { address_id, products, total_price, shipping_price } = req.body;
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'No products provided' });
      }

      const address = await prisma.address.findFirst({
        where: {
          address_id: Number(address_id),
          profile_id: profile.profile_id,
        },
      });
      if (!address) return res.status(404).json({ error: 'Address not found' });

      const nearestStore = await prisma.store.findFirst();
      if (!nearestStore) return res.status(400).json({ error: 'No store available' });

      for (const item of products) {
        const stock = await prisma.stock.findFirst({
          where: {
            product_id: Number(item.product_id),
            store_id: nearestStore.store_id,
          },
        });
        if (!stock || stock.quantity < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for product ${item.product_id}`,
          });
        }
      }

      const now = new Date();
      const orderNumber = generateOrderNumber(now);

      const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
          data: {
            order_number: orderNumber,
            store_id: nearestStore.store_id,
            address_id: address.address_id,
            total_price: 0,
            shipping_price: shipping_price || null,
            total_payment: 0,
            status: 'menunggu_pembayaran',
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

        let total = 0;

        for (const item of createdOrder.order_items) {
          const product = await tx.product.findUnique({
            where: { product_id: item.product_id },
          });
          if (product) {
            const price = product.product_price;
            const subtotal = price * item.quantity;
            total += subtotal;

            await tx.orderItem.update({
              where: { order_item_id: item.order_item_id },
              data: { price, subtotal },
            });

            const stock = await tx.stock.findFirst({
              where: {
                product_id: item.product_id,
                store_id: nearestStore.store_id,
              },
            });
            if (stock) {
              await tx.stock.update({
                where: { stock_id: stock.stock_id },
                data: { quantity: stock.quantity - item.quantity },
              });
              await tx.stockJournal.create({
                data: {
                  store_id: nearestStore.store_id,
                  stock_id: stock.stock_id,
                  product_id: item.product_id.toString(),
                  quantity: item.quantity,
                  type: 'out',
                  notes: `Order ${orderNumber} created - stock deducted`,
                  created_at: new Date(),
                },
              });
            }
          }
        }

        const totalPayment = total + (shipping_price || 0);

        const updatedOrder = await tx.order.update({
          where: { order_id: createdOrder.order_id },
          data: { total_price: total, total_payment: totalPayment },
          include: { order_items: true },
        });

        return updatedOrder;
      });

      return res.status(201).json(order);
    } catch (error) {
      console.error('Create Order Error:', error);
      return res.status(500).json({ error: 'Failed to create order' });
    }
  }

  // upload payment proof, cloudinary
  async uploadPaymentProof(req: Request, res: Response): Promise<any> {
    try {
      const { order_id } = req.params;
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const uploadedResult = await uploadImage(req.file.path);
      const imageUrl = uploadedResult.secure_url;

      const paymentProof = await prisma.paymentProof.create({
        data: {
          order_id: Number(order_id),
          image_url: imageUrl,
          uploaded_at: new Date(),
          status: 'pending',
        },
      });

      await prisma.order.update({
        where: { order_id: Number(order_id) },
        data: { status: 'menunggu_konfirmasi' },
      });

      return res.status(200).json({
        message: 'Payment proof uploaded successfully',
        paymentProof,
      });
    } catch (error) {
      console.error('Upload Payment Proof Error:', error);
      return res.status(500).json({ error: 'Failed to upload payment proof' });
    }
  }

  // get order list
  async getOrderList(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      const { date, order_id } = req.query;
      let whereClause: any = { profile_id: profile.profile_id };

      if (order_id) whereClause.order_id = Number(order_id);
      if (date) {
        const localStart = new Date((date as string) + 'T00:00:00');
        const localEnd = new Date((date as string) + 'T23:59:59');
        const start = new Date(localStart.getTime() - 7 * 60 * 60 * 1000);
        const end = new Date(localEnd.getTime() - 7 * 60 * 60 * 1000);
        console.log('Filtering orders with start:', start, 'and end:', end);
        whereClause.order_date = { gte: start, lt: end };
      }

      const orders = await prisma.order.findMany({
        where: whereClause,
        include: {
          order_items: { include: { product: true } },
          payment_proof: true,
        },
      });
      return res.status(200).json(orders);
    } catch (error) {
      console.error('Get Order List Error:', error);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  // cancel order before payment proof upload
  async cancelOrder(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      const { order_id } = req.params;
      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
        include: { order_items: true },
      });
      if (!order || order.profile_id !== profile.profile_id) {
        return res.status(404).json({ error: 'Order not found' });
      }
      if (order.status !== 'menunggu_pembayaran') {
        return res.status(400).json({ error: 'Order cannot be canceled at this stage' });
      }

      const { reason } = req.body;
      const canceledOrder = await prisma.$transaction(async (tx) => {
        for (const item of order.order_items) {
          const stock = await tx.stock.findFirst({
            where: {
              product_id: item.product_id,
              store_id: order.store_id,
            },
          });
          if (stock) {
            await tx.stock.update({
              where: { stock_id: stock.stock_id },
              data: { quantity: stock.quantity + item.quantity },
            });
            await tx.stockJournal.create({
              data: {
                store_id: order.store_id,
                stock_id: stock.stock_id,
                product_id: item.product_id.toString(),
                quantity: item.quantity,
                type: 'in',
                notes: `Order ${order.order_number || order.order_id} canceled by user: ${reason || 'No reason provided'}`,
                created_at: new Date(),
              },
            });
          }
        }

        await tx.orderCancel.create({
          data: {
            order_id: order.order_id,
            reason: reason || 'User canceled the order',
            canceled_at: new Date(),
          },
        });

        const updatedOrder = await tx.order.update({
          where: { order_id: order.order_id },
          data: { status: 'dibatalkan' },
        });
        return updatedOrder;
      });

      return res.status(200).json({
        message: 'Order canceled successfully and stock has been returned',
        order: canceledOrder,
      });
    } catch (error) {
      console.error('Cancel Order Error:', error);
      return res.status(500).json({ error: 'Failed to cancel order' });
    }
  }

  // confirm order receipt
  async confirmOrder(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) return res.status(404).json({ error: 'Profile not found' });

      const { order_id } = req.params;
      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
      });
      if (!order || order.profile_id !== profile.profile_id) {
        return res.status(404).json({ error: 'Order not found' });
      }
      if (order.status !== 'dikirim') {
        return res.status(400).json({ error: 'Order cannot be confirmed at this stage' });
      }

      const updatedOrder = await prisma.order.update({
        where: { order_id: order.order_id },
        data: { status: 'pesanan_dikonfirmasi' },
      });
      return res.status(200).json({
        message: 'Order confirmed successfully',
        order: updatedOrder,
      });
    } catch (error) {
      console.error('Confirm Order Error:', error);
      return res.status(500).json({ error: 'Failed to confirm order' });
    }
  }
  // get order by id
  async getOrderById(req: Request, res: Response): Promise<any> {
    const userId = '1';
    try {
      const profile = await prisma.profile.findUnique({
        where: { user_id: userId },
      });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      const { order_id } = req.params;
      const order = await prisma.order.findUnique({
        where: { order_id: Number(order_id) },
        include: {
          order_items: {
            include: { product: true },
          },
          payment_proof: true,
        },
      });

      if (!order || order.profile_id !== profile.profile_id) {
        return res.status(404).json({ error: 'Order not found' });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error('Get Order By Id Error:', error);
      return res.status(500).json({ error: 'Failed to fetch order details' });
    }
  }
  // method auto cancel
  async autoCancelOrders(): Promise<void> {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const ordersToCancel = await prisma.order.findMany({
        where: {
          status: 'menunggu_pembayaran',
          order_date: { lt: oneHourAgo },
        },
        include: { order_items: true },
      });
      for (const order of ordersToCancel) {
        await prisma.$transaction(async (tx) => {
          for (const item of order.order_items) {
            const stock = await tx.stock.findFirst({
              where: {
                product_id: item.product_id,
                store_id: order.store_id,
              },
            });
            if (stock) {
              await tx.stock.update({
                where: { stock_id: stock.stock_id },
                data: { quantity: stock.quantity + item.quantity },
              });
              await tx.stockJournal.create({
                data: {
                  store_id: order.store_id,
                  stock_id: stock.stock_id,
                  product_id: item.product_id.toString(),
                  quantity: item.quantity,
                  type: 'in',
                  notes: `Auto cancel order ${order.order_number || order.order_id}: stock returned`,
                  created_at: new Date(),
                },
              });
            }
          }
          await tx.orderCancel.create({
            data: {
              order_id: order.order_id,
              reason: 'Auto cancelled due to timeout',
              canceled_at: new Date(),
            },
          });
          await tx.order.update({
            where: { order_id: order.order_id },
            data: { status: 'dibatalkan' },
          });
        });
        console.log(`Order ${order.order_id} auto cancelled and stock returned.`);
      }
    } catch (error) {
      console.error('Error auto-cancelling orders:', error);
    }
  }

  // method untuk auto-confirmation
  async autoConfirmOrders(): Promise<void> {
    try {
      const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
      const ordersToConfirm = await prisma.order.findMany({
        where: {
          status: 'dikirim',
          order_date: { lt: twoDaysAgo },
        },
      });
      for (const order of ordersToConfirm) {
        await prisma.order.update({
          where: { order_id: order.order_id },
          data: { status: 'pesanan_dikonfirmasi' },
        });
        console.log(`Order ${order.order_id} auto confirmed.`);
      }
    } catch (error) {
      console.error('Error auto-confirming orders:', error);
    }
  }
}
