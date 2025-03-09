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
exports.getOrderListService = getOrderListService;
const prisma_1 = __importDefault(require("../../prisma"));
function getOrderListService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ profile_id, date, order_id, }) {
        let whereClause = { profile_id };
        if (order_id)
            whereClause.order_id = order_id;
        if (date) {
            const localStart = new Date(date + "T00:00:00");
            const localEnd = new Date(date + "T23:59:59");
            const start = new Date(localStart.getTime() - 7 * 60 * 60 * 1000);
            const end = new Date(localEnd.getTime() - 7 * 60 * 60 * 1000);
            whereClause.order_date = { gte: start, lt: end };
        }
        const orders = yield prisma_1.default.order.findMany({
            where: whereClause,
            include: {
                order_items: {
                    include: {
                        product: {
                            include: { product_img: true },
                        },
                    },
                },
                payment_proof: true,
            },
        });
        return orders;
    });
}
