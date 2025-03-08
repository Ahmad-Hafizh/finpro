import prisma from "../../prisma";

export async function getVouchersService(voucherType: string) {
  const now = new Date();
  if (voucherType === "ongkir") {
    const vouchers = await prisma.voucherOngkir.findMany({
      where: {
        voucher_ongkir_enddate: { gte: now },
      },
      select: {
        voucher_ongkir_id: true,
        voucher_ongkir_code: true,
        voucher_ongkir_nominal: true,
      },
    });
    return vouchers.map((v) => ({
      voucher_id: v.voucher_ongkir_id,
      voucher_code: v.voucher_ongkir_code,
      nominal: v.voucher_ongkir_nominal,
    }));
  } else if (voucherType === "payment") {
    const vouchers = await prisma.voucherStore.findMany({
      where: {
        voucher_store_enddate: { gte: now },
      },
      select: {
        voucher_store_id: true,
        voucher_store_code: true,
        voucher_store_amount_percentage: true,
        voucher_store_exact_nominal: true,
        voucher_store_minimum_buy: true,
        voucher_store_maximum_nominal: true,
      },
    });
    return vouchers.map((v) => ({
      voucher_id: v.voucher_store_id,
      voucher_code: v.voucher_store_code,
      amount_percentage: v.voucher_store_amount_percentage,
      exact_nominal: v.voucher_store_exact_nominal,
      minimum_buy: v.voucher_store_minimum_buy,
      maximum_nominal: v.voucher_store_maximum_nominal,
    }));
  } else if (voucherType === "product") {
    const vouchers = await prisma.voucherProduct.findMany({
      where: {
        voucher_product_enddate: { gte: now },
      },
      select: {
        voucher_product_id: true,
        voucher_product_code: true,
        product_id: true,
      },
    });
    return vouchers.map((v) => ({
      voucher_id: v.voucher_product_id,
      voucher_code: v.voucher_product_code,
      product_id: v.product_id,
    }));
  } else {
    return [];
  }
}
