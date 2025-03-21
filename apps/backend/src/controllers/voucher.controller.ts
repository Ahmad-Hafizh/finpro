import { Request, Response } from "express";
import ResponseHandler from "../utils/responseHandler";
import prisma from "../prisma";
import { getVouchersService } from "../services/voucher/get.voucher.service";
interface FormattedOngkirVoucher {
  id: number;
  code: string;
  type: "ongkir";
  discount: number;
  validUntil: Date;
  displayText: string;
}

interface FormattedStoreVoucher {
  id: number;
  code: string;
  type: "payment";
  percentageDiscount: number;
  exactDiscount: number;
  minimumPurchase: number;
  maximumDiscount: number;
  validUntil: Date;
  displayText: string;
}

interface FormattedProductVoucher {
  id: number;
  code: string;
  type: "product";
  productId: number;
  productName: string;
  validUntil: Date;
  displayText: string;
}
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

      const user = res.locals.user.id;
      const adminId = await prisma.admin.findFirst({
        where: {
          user_id: user,
        },
      });

      if (!adminId) {
        return ResponseHandler.error(res, 400, "Admin not found");
      }

      const newOngkirVoucher = await prisma.voucherOngkir.create({
        data: {
          voucher_ongkir_code: code,
          voucher_ongkir_nominal: parseInt(nominal),
          voucher_ongkir_startdate: new Date(startdate),
          voucher_ongkir_enddate: new Date(enddate),
          store_id: parseInt(store_id),
          admin_responsible: adminId?.admin_id,
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
      const user = res.locals.user.id;
      const adminId = await prisma.admin.findFirst({
        where: {
          user_id: user,
        },
      });

      if (!adminId) {
        return ResponseHandler.error(res, 400, "Admin not found");
      }
      const newProductVoucher = await prisma.voucherProduct.create({
        data: {
          voucher_product_code: code,
          voucher_product_startdate: new Date(startdate),
          voucher_product_enddate: new Date(enddate),
          admin_responsible: adminId?.admin_id,
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

      const user = res.locals.user.id;

      const adminId = await prisma.admin.findFirst({
        where: {
          user_id: user,
        },
      });

      if (!adminId) {
        return ResponseHandler.error(res, 400, "Admin not found");
      }

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
          admin_responsible: adminId?.admin_id,
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
  async getBanner(req: Request, res: Response): Promise<any> {
    try {
      const banners = await prisma.banner.findMany({
        take: 3,
      });

      return ResponseHandler.success(res, 200, "get banner success", banners);
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal Server Error");
    }
  }

  async getVouchers(req: Request, res: Response): Promise<any> {
    try {
      const type = req.query.type as string;
      const storeId = req.query.store_id
        ? parseInt(req.query.store_id as string)
        : undefined;
      if (!type) {
        return res.status(400).json({ error: "Voucher type is required" });
      }
      const vouchers = await getVouchersService(type, storeId);
      return ResponseHandler.success(res, 200, "Get Voucher Success", vouchers);
    } catch (error: any) {
      console.error("Get Vouchers Error:", error);
      return ResponseHandler.error(
        res,
        500,
        error.message || "Failed to get vouchers"
      );
    }
  }
}
