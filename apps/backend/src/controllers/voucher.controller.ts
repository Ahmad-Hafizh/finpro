import { Request, Response } from "express";
import ResponseHandler from "../utils/responseHandler";
import prisma from "../prisma";
import { getVoucher } from "../services/voucher/voucher.service";

export class VoucherController {
  async getAllVoucher(req: Request, res: Response): Promise<any> {
    try {
      const { store_id } = req.query;

      const storeId = parseInt(store_id as string);

      const voucherStores = await prisma.voucherStore.findMany({
        where: storeId ? { store_id: storeId } : undefined,
        include: { store: true },
      });

      const voucherOngkirs = await prisma.voucherOngkir.findMany({
        where: storeId ? { store_id: storeId } : undefined,
        include: { store: true },
      });

      const voucherProducts = await prisma.voucherProduct.findMany({
        where: storeId
          ? { product: { stock: { some: { store_id: storeId } } } }
          : undefined,
        include: { product: { include: { stock: true } } },
      });

      const vouchers = [
        ...voucherStores.map((voucher: any) => ({ ...voucher, type: "store" })),
        ...voucherOngkirs.map((voucher: any) => ({
          ...voucher,
          type: "ongkir",
        })),
        ...voucherProducts.map((voucher: any) => ({
          ...voucher,
          type: "product",
        })),
      ];

      return ResponseHandler.success(res, 200, "Get Voucher Success", vouchers);
    } catch (error) {
      console.log(error);
      return ResponseHandler.error(res, 500, "internal Server Error");
    }
  }

  async createNewOngkirVoucher(req: Request, res: Response): Promise<any> {
    try {
      const { code, nominal, startdate, enddate, store_id } = req.body;
      const admin = 4;
      const user = res.locals.user;
      console.log("INI USER VOUCHER : ", user);

      const newOngkirVoucher = await prisma.voucherOngkir.create({
        data: {
          voucher_ongkir_code: code,
          voucher_ongkir_nominal: parseInt(nominal),
          voucher_ongkir_startdate: new Date(startdate),
          voucher_ongkir_enddate: new Date(enddate),
          store_id: parseInt(store_id),
          admin_responsible: admin,
          created_at: new Date(),
        },
      });

      return ResponseHandler.success(
        res,
        200,
        "create new stock success",
        newOngkirVoucher
      );
    } catch (error) {
      console.log("ERROR : ", error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async createNewProductVoucher(req: Request, res: Response): Promise<any> {
    try {
      const { code, nominal, startdate, enddate, product_id } = req.body;
      const admin = 4;

      const newProductVoucher = await prisma.voucherProduct.create({
        data: {
          voucher_product_code: code,
          voucher_product_startdate: new Date(startdate),
          voucher_product_enddate: new Date(enddate),
          admin_responsible: admin,
          created_at: new Date(),
          product_id: parseInt(product_id),
        },
      });

      return ResponseHandler.success(
        res,
        200,
        "create new stock success",
        newProductVoucher
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async createNewStoreVoucher(req: Request, res: Response): Promise<any> {
    try {
      const {
        code,
        amount_percentage,
        exact_nominal,
        minimum_buy,
        maximum_nominal,
        startdate,
        enddate,
        store_id,
      } = req.body;

      const admin = 4;

      const newStoreVoucher = await prisma.voucherStore.create({
        data: {
          voucher_store_code: code as string,
          voucher_store_amount_percentage:
            parseInt(amount_percentage as string) || 0,
          voucher_store_exact_nominal: parseInt(exact_nominal as string) || 0,
          voucher_store_minimum_buy: parseInt(minimum_buy as string) || 0,
          voucher_store_maximum_nominal:
            parseInt(maximum_nominal as string) || 0,
          voucher_store_startdate: new Date(startdate as string),
          voucher_store_enddate: new Date(enddate as string),
          store_id: parseInt(store_id as string),
          created_at: new Date(),
          admin_responsible: admin,
        },
      });

      return ResponseHandler.success(
        res,
        200,
        "Add voucher code success",
        newStoreVoucher
      );
    } catch (error) {
      console.log(error);
      return ResponseHandler.error(res, 500, "Internal Server Error");
    }
  }

  async getVoucherTwo(req: Request, res: Response): Promise<any> {
    try {
      const voucher = await getVoucher(8, 5);
      return ResponseHandler.success(res, 200, "Success", voucher);
    } catch (error) {}
  }
}
