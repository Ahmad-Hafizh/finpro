"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockReportController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const prisma_1 = __importDefault(require("../prisma"));
class StockReportController {
    getStockReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store, product, sort, cat, search, page = 1, pageSize = 8, } = req.query;
                const pages = parseInt(page) || 1;
                const size = parseInt(pageSize) || 10;
                const skip = (pages - 1) * size;
                const categories = cat
                    ? Array.isArray(cat)
                        ? cat.map(String)
                        : cat.split(",")
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
                const stockReport = yield prisma_1.default.stockJournal.findMany({
                    skip,
                    take: size,
                    where: {
                        AND: [
                            store ? { store_id: parseInt(store) } : {},
                            product ? { product_id: parseInt(product) } : {},
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
                                            contains: search,
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
                const totalItems = yield prisma_1.default.stockJournal.count({
                    where: {
                        AND: [
                            store ? { store_id: parseInt(store) } : {},
                            product ? { product_id: parseInt(product) } : {},
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
                                            contains: search,
                                            mode: "insensitive",
                                        },
                                    },
                                }
                                : {},
                        ],
                    },
                });
                const totalPages = Math.ceil(totalItems / size);
                return responseHandler_1.default.success(res, 200, "Get stock report success", {
                    stockReport,
                    totalItems,
                    totalPages,
                    currentPage: pages,
                    pageSize: size,
                });
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    getStockReportTotal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { month, store } = req.query;
                const startDate = month ? new Date(`${month}-01T00:00:00Z`) : null;
                const endDate = startDate
                    ? new Date(new Date(startDate).setMonth(startDate.getMonth() + 1))
                    : null;
                const latestStockEntry = yield prisma_1.default.stockJournal.findFirst({
                    where: Object.assign(Object.assign({}, (startDate && endDate
                        ? {
                            created_at: { gte: startDate, lt: endDate },
                        }
                        : {})), (store ? { store_id: parseInt(store) } : {})),
                    orderBy: {
                        created_at: "desc",
                    },
                    select: {
                        stock_result: true,
                    },
                });
                const stockTotal = yield prisma_1.default.stock.aggregate({
                    _sum: {
                        quantity: true,
                    },
                });
                const totalAddedStock = yield prisma_1.default.stockJournal.aggregate({
                    _sum: {
                        quantity: true,
                    },
                    where: Object.assign(Object.assign(Object.assign({}, (startDate && endDate
                        ? {
                            created_at: { gte: startDate, lt: endDate },
                        }
                        : {})), (store ? { store_id: parseInt(store) } : {})), { type: "in" }),
                });
                const totalReducedStock = yield prisma_1.default.stockJournal.aggregate({
                    _sum: {
                        quantity: true,
                    },
                    where: Object.assign(Object.assign(Object.assign({}, (startDate && endDate
                        ? {
                            created_at: { gte: startDate, lt: endDate },
                        }
                        : {})), (store ? { store_id: parseInt(store) } : {})), { type: "out" }),
                });
                return responseHandler_1.default.success(res, 200, "Get stock report total success", {
                    stockTotal,
                    totalAddedStock,
                    totalReducedStock,
                });
            }
            catch (error) {
                console.log(error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
}
exports.StockReportController = StockReportController;
