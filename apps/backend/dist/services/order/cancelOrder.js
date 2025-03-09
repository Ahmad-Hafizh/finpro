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
exports.cancelOrderService = cancelOrderService;
const prisma_1 = __importDefault(require("../../prisma"));
function cancelOrderService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ profile_id, order_id, reason, }) {
        const order = yield prisma_1.default.order.findUnique({
            where: { order_id },
            include: { order_items: true },
        });
        if (!order || order.profile_id !== profile_id) {
            throw new Error("Order not found");
        }
        if (order.status !== "menunggu_pembayaran") {
            throw new Error("Order cannot be canceled at this stage");
        }
        const canceledOrder = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            for (const item of order.order_items) {
                const stock = yield tx.stock.findFirst({
                    where: {
                        product_id: item.product_id,
                        store_id: order.store_id,
                    },
                });
                if (stock) {
                    yield tx.stock.update({
                        where: { stock_id: stock.stock_id },
                        data: { quantity: stock.quantity + item.quantity },
                    });
                    yield tx.stockJournal.create({
                        data: {
                            store_id: order.store_id,
                            stock_id: stock.stock_id,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            type: "in",
                            notes: `Order ${order.order_number || order.order_id} canceled by user: ${reason || "No reason provided"}`,
                            created_at: new Date(),
                            stock_result: stock.quantity + item.quantity,
                        },
                    });
                }
            }
            yield tx.orderCancel.create({
                data: {
                    order_id: order.order_id,
                    reason: reason || "User canceled the order",
                    canceled_at: new Date(),
                },
            });
            const updatedOrder = yield tx.order.update({
                where: { order_id: order.order_id },
                data: { status: "dibatalkan" },
            });
            return updatedOrder;
        }));
        return canceledOrder;
    });
}
