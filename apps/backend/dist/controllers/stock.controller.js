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
exports.StockController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const prisma_1 = __importDefault(require("../prisma"));
class StockController {
    getALLStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getStore = yield prisma_1.default.store.findMany();
                return responseHandler_1.default.success(res, 200, "get all store success", getStore);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    createNewStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, product_id, quantity } = req.body;
                const admin = "1";
                const newStock = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const checkStock = yield tx.stock.findFirst({
                        where: {
                            store_id: parseInt(store_id),
                            product_id: parseInt(product_id),
                        },
                    });
                    console.log("Ini check stock : ", checkStock);
                    if (checkStock) {
                        throw new Error("Stock has already been created");
                    }
                    const createStock = yield tx.stock.create({
                        data: {
                            store_id: parseInt(store_id),
                            product_id: parseInt(product_id),
                            quantity: parseInt(quantity),
                        },
                    });
                    const newStockJournal = yield tx.stockJournal.create({
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
                }));
                return responseHandler_1.default.success(res, 200, "create new stock success", newStock);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    updateStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, product_id, quantity } = req.body;
                const admin = "1";
                const updateStock = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const findStock = yield tx.stock.findFirst({
                        where: {
                            store_id: parseInt(store_id),
                            product_id: parseInt(product_id),
                        },
                    });
                    if (!findStock) {
                        throw new Error("Stock not found");
                    }
                    const updateOrDelete = parseInt(quantity) > findStock.quantity ? "in" : "out";
                    const totalAdded = Math.abs(parseInt(quantity) - findStock.quantity);
                    const updateStock = yield tx.stock.update({
                        where: {
                            stock_id: findStock.stock_id,
                        },
                        data: {
                            quantity: parseInt(quantity),
                        },
                    });
                    const updateStockJournal = yield tx.stockJournal.create({
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
                            notes: updateOrDelete === "in"
                                ? `Admin ${admin} updating new stock: stock added`
                                : `Admin ${admin} updating new stock: stock reduced`,
                            stock_result: updateStock.quantity,
                        },
                    });
                    return updateStock;
                }));
                return responseHandler_1.default.success(res, 200, "update stock success", updateStock);
            }
            catch (error) {
                console.log("Error : ", error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
    outOfStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, product_id, quantity = 0 } = req.body;
                const admin = "1";
                const outOfStock = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const findStock = yield tx.stock.findFirst({
                        where: {
                            store_id: parseInt(store_id),
                            product_id: parseInt(product_id),
                        },
                    });
                    if (!findStock) {
                        throw new Error("Stock not found");
                    }
                    const outOfStock = yield tx.stock.update({
                        where: {
                            stock_id: findStock.stock_id,
                        },
                        data: {
                            quantity: 0,
                        },
                    });
                    const totalAdded = Math.abs(parseInt(quantity) - findStock.quantity);
                    const updateStockJournal = yield tx.stockJournal.create({
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
                }));
                return responseHandler_1.default.success(res, 200, "out of stock success", outOfStock);
            }
            catch (error) {
                console.log("Error : ", error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
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
    getStockReportByMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    }
}
exports.StockController = StockController;
