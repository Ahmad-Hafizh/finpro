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
exports.autoConfirmOrdersService = autoConfirmOrdersService;
const prisma_1 = __importDefault(require("../../prisma"));
function autoConfirmOrdersService() {
    return __awaiter(this, void 0, void 0, function* () {
        const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const ordersToConfirm = yield prisma_1.default.order.findMany({
            where: {
                status: "dikirim",
                order_date: { lt: twoDaysAgo },
            },
        });
        for (const order of ordersToConfirm) {
            yield prisma_1.default.order.update({
                where: { order_id: order.order_id },
                data: { status: "pesanan_dikonfirmasi" },
            });
            console.log(`Order ${order.order_id} auto confirmed.`);
        }
    });
}
