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
exports.confirmOrderService = confirmOrderService;
const prisma_1 = __importDefault(require("../../prisma"));
function confirmOrderService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ profile_id, order_id, }) {
        const order = yield prisma_1.default.order.findUnique({ where: { order_id } });
        if (!order || order.profile_id !== profile_id) {
            throw new Error("Order not found");
        }
        if (order.status !== "dikirim") {
            throw new Error("Order cannot be confirmed at this stage");
        }
        const updatedOrder = yield prisma_1.default.order.update({
            where: { order_id: order.order_id },
            data: { status: "pesanan_dikonfirmasi" },
        });
        return updatedOrder;
    });
}
