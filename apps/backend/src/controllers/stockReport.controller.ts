import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import prisma from "../prisma";
import { date } from "zod";

export class StockReportController {
  async getStockReport(req: Request, res: Response): Promise<any> {
    try {
      const {
        store,
        product,
        sort,
        cat,
        search,
        page = 1,
        pageSize = 8,
      } = req.query;

      const pages = parseInt(page as string) || 1;
      const size = parseInt(pageSize as string) || 10;
      const skip = (pages - 1) * size;

      const categories = cat
        ? Array.isArray(cat)
          ? cat.map(String)
          : (cat as string).split(",")
        : [];

      let dateFilter = {};
      if (sort) {
        const startDate = new Date(`${sort}-01T00:00:00.000Z`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        dateFilter = {
          created_at: {
            gte: startDate,
            lt: endDate,
          },
        };
      }

      const stockReport = await prisma.stockJournal.findMany({
        skip,
        take: size,
        where: {
          AND: [
            store ? { store_id: parseInt(store as string) } : {},
            product ? { product_id: parseInt(product as string) } : {},
            dateFilter,
            categories.length > 0
              ? {
                  product: {
                    product_category: {
                      product_category_name: { in: categories },
                    },
                  },
                }
              : {},
            search
              ? {
                  product: {
                    product_name: {
                      contains: search as string,
                      mode: "insensitive",
                    },
                  },
                }
              : {},
          ],
        },
        include: {
          store: true,
          stock: true,
          product: {
            include: {
              product_category: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      const totalItems = await prisma.stockJournal.count({
        where: {
          AND: [
            store ? { store_id: parseInt(store as string) } : {},
            product ? { product_id: parseInt(product as string) } : {},
            dateFilter,
            categories.length > 0
              ? {
                  product: {
                    product_category: {
                      product_category_name: { in: categories },
                    },
                  },
                }
              : {},
            search
              ? {
                  product: {
                    product_name: {
                      contains: search as string,
                      mode: "insensitive",
                    },
                  },
                }
              : {},
          ],
        },
      });

      const totalPages = Math.ceil(totalItems / size);

      return ResponseHandler.success(res, 200, "Get stock report success", {
        stockReport,
        totalItems,
        totalPages,
        currentPage: pages,
        pageSize: size,
      });
    } catch (error) {
      console.log(error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }

  async getStockReportTotal(req: Request, res: Response): Promise<any> {
    try {
      const { month, store } = req.query;

      const startDate = month ? new Date(`${month}-01T00:00:00Z`) : null;
      const endDate = startDate
        ? new Date(new Date(startDate).setMonth(startDate.getMonth() + 1))
        : null;

      const latestStockEntry = await prisma.stockJournal.findFirst({
        where: {
          ...(startDate && endDate
            ? {
                created_at: { gte: startDate, lt: endDate },
              }
            : {}),
          ...(store ? { store_id: parseInt(store as string) } : {}),
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          stock_result: true,
        },
      });

      const stockTotal = await prisma.stock.aggregate({
        _sum: {
          quantity: true,
        },
      });

      const totalAddedStock = await prisma.stockJournal.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          ...(startDate && endDate
            ? {
                created_at: { gte: startDate, lt: endDate },
              }
            : {}),
          ...(store ? { store_id: parseInt(store as string) } : {}),
          type: "in",
        },
      });

      const totalReducedStock = await prisma.stockJournal.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          ...(startDate && endDate
            ? {
                created_at: { gte: startDate, lt: endDate },
              }
            : {}),
          ...(store ? { store_id: parseInt(store as string) } : {}),
          type: "out",
        },
      });

      return ResponseHandler.success(
        res,
        200,
        "Get stock report total success",
        {
          stockTotal,
          totalAddedStock,
          totalReducedStock,
        }
      );
    } catch (error) {
      console.log(error);
      return ResponseHandler.error(res, 500, "Internal server error", error);
    }
  }
}
