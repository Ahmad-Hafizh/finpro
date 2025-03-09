import prisma from "../../prisma";
import { getVoucher } from "../voucher/voucher.service";

const generateOrderNumber = (date: Date): string => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const datePrefix = `${yyyy}${mm}${dd}`;
  const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
  return `${datePrefix}${randomDigits}`;
};

interface CreateOrderParams {
  userId: string;
  address_id: number;
  products: Array<{ product_id: number; quantity: number }>;
  shipping_price?: number;
  voucherType?: "ongkir" | "payment" | "product";
  voucher_code?: string;
  store_id: number;
}

export async function createOrderService(params: CreateOrderParams) {
  const {
    userId,
    address_id,
    products,
    shipping_price,
    voucherType,
    voucher_code,
    store_id,
  } = params;
  const now = new Date();

  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
  });
  if (!profile) throw new Error("Profile not found");

  const address = await prisma.address.findFirst({
    where: { address_id: address_id, profile_id: profile.profile_id },
  });
  if (!address) throw new Error("Address not found");

  const nearestStore = await prisma.store.findUnique({
    where: { store_id },
  });
  if (!nearestStore) throw new Error("Store not found");

  for (const item of products) {
    const stock = await prisma.stock.findFirst({
      where: {
        product_id: item.product_id,
        store_id: nearestStore.store_id,
      },
    });
    if (!stock || stock.quantity < item.quantity) {
      throw new Error(`Insufficient stock for product ${item.product_id}`);
    }
  }

  const orderNumber = generateOrderNumber(now);

  const order = await prisma.$transaction(
    async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          order_number: orderNumber,
          store_id: nearestStore.store_id,
          address_id: address.address_id,
          total_price: 0,
          shipping_price: shipping_price || null,
          total_payment: 0,
          status: "menunggu_pembayaran",
          order_date: now,
          profile_id: profile.profile_id,
          order_items: {
            create: products.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
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
        }
      }

      let finalShippingPrice = shipping_price || 0;
      let finalTotalPayment = total + finalShippingPrice;
      let discountAmount = 0;
      let appliedVoucherCode: string | null = null;
      let voucherProductApplied: { product_id: number } | null = null;

      if (voucherType && voucher_code) {
        let voucherData;
        if (voucherType === "product") {
          const combinedVoucherData = { getProductVoucher: [] };
          for (const prod of products) {
            const data = await getVoucher(
              nearestStore.store_id,
              prod.product_id
            );
            combinedVoucherData.getProductVoucher =
              combinedVoucherData.getProductVoucher.concat(
                data.getProductVoucher || []
              );
          }
          voucherData = combinedVoucherData;
        } else {
          voucherData = await getVoucher(
            nearestStore.store_id,
            products[0].product_id
          );
        }

        let appliedVoucher = null;
        if (voucherType === "ongkir") {
          appliedVoucher = voucherData.getOngkirVoucher.find(
            (v: any) => v.voucher_ongkir_code === voucher_code
          );
          if (appliedVoucher) {
            discountAmount = appliedVoucher.voucher_ongkir_nominal;

            finalShippingPrice = finalShippingPrice - discountAmount;
            if (finalShippingPrice < 0) finalShippingPrice = 0;
            finalTotalPayment = total + finalShippingPrice;
            appliedVoucherCode = appliedVoucher.voucher_ongkir_code;
          }
        } else if (voucherType === "payment") {
          appliedVoucher = voucherData.getStoreVoucher.find(
            (v: any) => v.voucher_store_code === voucher_code
          );
          if (appliedVoucher) {
            if (appliedVoucher.voucher_store_amount_percentage > 0) {
              if (total >= appliedVoucher.voucher_store_minimum_buy) {
                discountAmount = Math.floor(
                  (total * appliedVoucher.voucher_store_amount_percentage) / 100
                );
                if (
                  discountAmount > appliedVoucher.voucher_store_maximum_nominal
                ) {
                  discountAmount = appliedVoucher.voucher_store_maximum_nominal;
                }
              } else {
                throw new Error(
                  `Minimum purchase for this voucher is Rp ${appliedVoucher.voucher_store_minimum_buy.toLocaleString()}.`
                );
              }
            } else {
              discountAmount = appliedVoucher.voucher_store_exact_nominal;
            }
            finalTotalPayment = finalTotalPayment - discountAmount;
            if (finalTotalPayment < 0) finalTotalPayment = 0;
            appliedVoucherCode = appliedVoucher.voucher_store_code;
          } else {
            appliedVoucher = voucherData.getProductVoucher.find(
              (v: any) => v.voucher_product_code === voucher_code
            );
            if (appliedVoucher) {
              discountAmount = 0;
              appliedVoucherCode = appliedVoucher.voucher_product_code;
              voucherProductApplied = { product_id: appliedVoucher.product_id };
            }
          }
        } else if (voucherType === "product") {
          appliedVoucher = voucherData.getProductVoucher.find(
            (v: any) => v.voucher_product_code === voucher_code
          );
          if (appliedVoucher) {
            discountAmount = 0;
            appliedVoucherCode = appliedVoucher.voucher_product_code;
            voucherProductApplied = { product_id: appliedVoucher.product_id };
          }
        }
      }

      const updatedOrder = await tx.order.update({
        where: { order_id: createdOrder.order_id },
        data: {
          total_price: total,
          shipping_price: finalShippingPrice,
          total_payment: finalTotalPayment,
          voucher_code: appliedVoucherCode,
        },
        include: { order_items: true },
      });

      for (const item of updatedOrder.order_items) {
        const stock = await tx.stock.findFirst({
          where: {
            product_id: item.product_id,
            store_id: nearestStore.store_id,
          },
        });
        if (stock) {
          let bonus = 0;
          if (
            voucherType === "product" &&
            voucher_code &&
            (
              await getVoucher(nearestStore.store_id, item.product_id)
            ).getProductVoucher.find(
              (v: any) => v.voucher_product_code === voucher_code
            )
          ) {
            bonus = 1;
          }
          const deductionQuantity = item.quantity + bonus;
          await tx.stock.update({
            where: { stock_id: stock.stock_id },
            data: { quantity: stock.quantity - deductionQuantity },
          });
          await tx.stockJournal.create({
            data: {
              store_id: nearestStore.store_id,
              stock_id: stock.stock_id,
              product_id: item.product_id,
              quantity: deductionQuantity,
              type: "out",
              notes:
                `Order ${orderNumber} created - stock deducted` +
                (bonus ? " (buy 1 get 1 applied)" : ""),
              created_at: now,
              stock_result: stock.quantity - deductionQuantity,
            },
          });
        }
      }

      if (voucherType === "product" && voucherProductApplied) {
        const freeProduct = await tx.product.findUnique({
          where: { product_id: voucherProductApplied.product_id },
        });
        if (freeProduct) {
          (updatedOrder as any).free_item = {
            product: freeProduct,
            quantity: 1,
          };
        }
      }

      return updatedOrder;
    },
    { timeout: 10000 }
  );

  return order;
}
