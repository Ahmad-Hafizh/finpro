import prisma from "../../prisma";

export const getVoucher = async (
  store_id: number,
  product_id: number
): Promise<any> => {
  const nowDate = new Date();

  const getOngkirVoucher = await prisma.voucherOngkir.findMany({
    where: {
      store_id: store_id,
      voucher_ongkir_enddate: {
        gte: nowDate,
      },
    },
  });

  const getProductVoucher = await prisma.voucherProduct.findMany({
    where: {
      product_id: product_id,
      voucher_product_enddate: {
        gte: nowDate,
      },
    },
  });

  const getStoreVoucher = await prisma.voucherStore.findMany({
    where: {
      store_id: store_id,
      voucher_store_enddate: {
        gte: nowDate,
      },
    },
  });

  return {
    getOngkirVoucher,
    getProductVoucher,
    getStoreVoucher,
  };
};
