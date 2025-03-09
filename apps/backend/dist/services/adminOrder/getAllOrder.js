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
exports.getAllOrdersService = getAllOrdersService;
const prisma_1 = __importDefault(require("../../prisma"));
function getAllOrdersService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ admin, query, }) {
        const pageSize = 10;
        const page = Number(query.page) || 1;
        let whereClause = {};
        if (admin && admin.user.role !== "super_admin") {
            whereClause.store_id = admin.store_id;
        }
        else {
            if (query.store_id) {
                whereClause.store_id = Number(query.store_id);
            }
        }
        if (query.orderNumber) {
            whereClause.order_number = {
                contains: query.orderNumber,
                mode: "insensitive",
            };
        }
        if (query.orderDate) {
            const orderDate = new Date(query.orderDate);
            const startDate = new Date(orderDate);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(orderDate);
            endDate.setHours(23, 59, 59, 999);
            whereClause.order_date = { gte: startDate, lte: endDate };
        }
        const totalCount = yield prisma_1.default.order.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / pageSize);
        const orders = yield prisma_1.default.order.findMany({
            where: whereClause,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                order_items: { include: { product: true } },
                payment_proof: true,
                address: true,
                profile: true,
            },
        });
        return { orders, totalPages };
    });
}
