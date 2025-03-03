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
const prisma_1 = __importDefault(require("../prisma"));
class StockReportController {
    getStockReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { store_id, product_id, selectedMonth } = req.query;
                const stockReport = yield prisma_1.default.stockJournal.findMany({
                    where: Object.assign(Object.assign(Object.assign({}, (store_id ? { store_id: parseInt(store_id) } : {})), (product_id ? { product_id: product_id } : {})), (selectedMonth
                        ? { created_at: { gte: new Date(), lte: new Date() } }
                        : {})),
                    include: {
                        stock: true,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.StockReportController = StockReportController;
