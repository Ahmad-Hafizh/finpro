import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import prisma from "../prisma";
import { findProduct } from "../services/product/getProduct.services";

export class StockController {
  async getALLStore(req: Request, res: Response): Promise<any> {
    try {
      const getStore = await prisma.store.findMany();
      return ResponseHandler.success(
        res,
        200,
        "get all store success",
        getStore
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async createNewStock(req: Request, res: Response): Promise<any> {
    try {
      const { store_id, product_id, quantity } = req.body;
      const user = res.locals.user;
      const admin = user.name;
      console.log("INI USER : ", user);

      const newStock = await prisma.$transaction(async (tx) => {
        const checkStock = await tx.stock.findFirst({
          where: {
            store_id: parseInt(store_id),
            product_id: parseInt(product_id),
          },
        });

        console.log("Ini check stock : ", checkStock);

        if (checkStock) {
          throw new Error("Stock has already been created");
        }

        const createStock = await tx.stock.create({
          data: {
            store_id: parseInt(store_id),
            product_id: parseInt(product_id),
            quantity: parseInt(quantity),
          },
        });

        const newStockJournal = await tx.stockJournal.create({
          data: {
            created_at: new Date(),
            store: {
              connect: { store_id: parseInt(store_id) },
            },
            stock: {
              connect: { stock_id: createStock.stock_id },
            },
            quantity: parseInt(quantity),
            type: "in",
            product: {
              connect: { product_id: parseInt(product_id) },
            },
            notes: `Admin ${admin} create new stock: stock added`,
            stock_result: createStock.quantity,
          },
        });

        return { createStock, newStockJournal };
      });

      return ResponseHandler.success(
        res,
        200,
        "create new stock success",
        newStock
      );
    } catch (error) {
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async updateStock(req: Request, res: Response): Promise<any> {
    try {
      const { store_id, product_id, quantity } = req.body;
      const user = res.locals.user;
      const admin = user.name;

      const updateStock = await prisma.$transaction(async (tx) => {
        const findStock = await tx.stock.findFirst({
          where: {
            store_id: parseInt(store_id),
            product_id: parseInt(product_id),
          },
        });

        if (!findStock) {
          throw new Error("Stock not found");
        }

        const updateOrDelete =
          parseInt(quantity) > findStock.quantity ? "in" : "out";
        const totalAdded = Math.abs(parseInt(quantity) - findStock.quantity);

        const updateStock = await tx.stock.update({
          where: {
            stock_id: findStock.stock_id,
          },
          data: {
            quantity: parseInt(quantity),
          },
        });

        const updateStockJournal = await tx.stockJournal.create({
          data: {
            created_at: new Date(),
            store: {
              connect: { store_id: parseInt(store_id) },
            },
            stock: {
              connect: { stock_id: updateStock.stock_id },
            },
            quantity: totalAdded,
            type: updateOrDelete,
            product: {
              connect: { product_id: parseInt(product_id) },
            },
            notes:
              updateOrDelete === "in"
                ? `Admin ${admin} updating new stock: stock added`
                : `Admin ${admin} updating new stock: stock reduced`,
            stock_result: updateStock.quantity,
          },
        });

        return updateStock;
      });

      return ResponseHandler.success(
        res,
        200,
        "update stock success",
        updateStock
      );
    } catch (error) {
      console.log("Error : ", error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async outOfStock(req: Request, res: Response): Promise<any> {
    try {
      const { store_id, product_id, quantity = 0 } = req.body;
      const user = res.locals.user;
      const admin = user.name;

      const outOfStock = await prisma.$transaction(async (tx) => {
        const findStock = await tx.stock.findFirst({
          where: {
            store_id: parseInt(store_id),
            product_id: parseInt(product_id),
          },
        });

        if (!findStock) {
          throw new Error("Stock not found");
        }

        const outOfStock = await tx.stock.update({
          where: {
            stock_id: findStock.stock_id,
          },
          data: {
            quantity: 0,
          },
        });

        const totalAdded = Math.abs(parseInt(quantity) - findStock.quantity);

        const updateStockJournal = await tx.stockJournal.create({
          data: {
            created_at: new Date(),
            store: {
              connect: { store_id: parseInt(store_id) },
            },
            stock: {
              connect: { stock_id: findStock.stock_id },
            },
            quantity: totalAdded,
            type: "out",
            product: {
              connect: { product_id: parseInt(product_id) },
            },
            notes: `Admin ${admin} updating new stock: stock reduced`,
            stock_result: 0,
          },
        });
      });

      return ResponseHandler.success(
        res,
        200,
        "out of stock success",
        outOfStock
      );
    } catch (error) {
      console.log("Error : ", error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  // async getStock(req: Request, res: Response): Promise<any> {
  //   try {
  //     const { page, search, cat, sort, del, store } = req.query;
  //     console.log(cat);
  //     const pageNumber = parseInt(page as string) || 1;
  //     const pageSize = 8;
  //     const category = cat as string;
  //     const keyword = search as string;
  //     const sortBy = sort as string;
  //     const deletedAt = del as string;
  //     const theStore = store as string;

  //     const objectPayload = {
  //       category,
  //       pageNumber,
  //       pageSize,
  //       keyword,
  //       sortBy,
  //       deletedAt,
  //       theStore,
  //     };

  //     const result = await findProduct(objectPayload);

  //     return ResponseHandler.success(
  //       res,
  //       200,
  //       "Get Product Data Success",
  //       result
  //     );
  //   } catch (error) {
  //     console.log("error from get product", error);
  //     return ResponseHandler.error(res, 500, "Internal Server Error", error);
  //   }
  // }

  async getStockReportByMonth(req: Request, res: Response): Promise<any> {
    try {
    } catch (error) {}
  }
}
