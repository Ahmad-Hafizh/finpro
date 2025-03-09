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
exports.sendUserOrderService = sendUserOrderService;
const prisma_1 = __importDefault(require("../../prisma"));
function sendUserOrderService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ admin, order_id, tracking_number, }) {
        const order = yield prisma_1.default.order.findUnique({
            where: { order_id: Number(order_id) },
        });
        if (!order)
            throw new Error("Order tidak ditemukan");
        if (order.status !== "diproses") {
            throw new Error("Order is not in a state that can be sent");
        }
        const updatedOrder = yield prisma_1.default.order.update({
            where: { order_id: order.order_id },
            data: {
                status: "dikirim",
                tracking_number: tracking_number !== undefined ? tracking_number : order.tracking_number,
            },
        });
        yield prisma_1.default.adminOrder.create({
            data: {
                admin_id: admin ? admin.admin_id : 0,
                order_id: order.order_id,
                action: "kirim_pesanan",
                action_time: new Date(),
            },
        });
        return updatedOrder;
    });
}
