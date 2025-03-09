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
exports.cancelUserOrderService = cancelUserOrderService;
const prisma_1 = __importDefault(require("../../prisma"));
function cancelUserOrderService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ admin, order_id, reason, }) {
        const order = yield prisma_1.default.order.findUnique({
            where: { order_id: Number(order_id) },
            include: { order_items: true },
        });
        if (!order)
            throw new Error("Order tidak ditemukan");
        // hanya bisa dibatalkan jika status order masih sebelum "dikirim"
        if (order.status === "dikirim" ||
            order.status === "pesanan_dikonfirmasi" ||
            order.status === "dibatalkan") {
            throw new Error("Order tidak dapat dibatalkan pada tahap ini");
        }
        const updatedOrder = yield prisma_1.default.order.update({
            where: { order_id: order.order_id },
            data: { status: "dibatalkan" },
        });
        // kembalikan stok untuk tiap item pesanan dan buat jurnal stok
        for (const item of order.order_items) {
            const stock = yield prisma_1.default.stock.findFirst({
                where: {
                    product_id: item.product_id,
                    store_id: order.store_id,
                },
            });
            if (stock) {
                yield prisma_1.default.stock.update({
                    where: { stock_id: stock.stock_id },
                    data: { quantity: stock.quantity + item.quantity },
                });
                yield prisma_1.default.stockJournal.create({
                    data: {
                        store_id: order.store_id,
                        stock_id: stock.stock_id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        type: "in",
                        notes: `Order ${order.order_number || order.order_id} dibatalkan: ${reason || "Alasan tidak diberikan"}`,
                        created_at: new Date(),
                        stock_result: stock.quantity + item.quantity,
                    },
                });
            }
        }
        yield prisma_1.default.adminOrder.create({
            data: {
                admin_id: admin ? admin.admin_id : 0,
                order_id: order.order_id,
                action: "batalkan_pesanan",
                action_time: new Date(),
            },
        });
        return updatedOrder;
    });
}
