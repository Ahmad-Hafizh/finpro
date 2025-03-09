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
exports.updateCartItemService = updateCartItemService;
const prisma_1 = __importDefault(require("../../prisma"));
function updateCartItemService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ cart_item_id, quantity, }) {
        if (quantity < 1) {
            throw new Error("Quantity should be more than 0");
        }
        const cartItem = yield prisma_1.default.cartItem.findUnique({
            where: { cart_item_id },
        });
        if (!cartItem) {
            throw new Error("Item doesn't exist");
        }
        const stock = yield prisma_1.default.stock.findFirst({
            where: { product_id: cartItem.product_id },
        });
        if (!stock || stock.quantity < quantity) {
            throw new Error("Insufficient stock");
        }
        const updatedCartItem = yield prisma_1.default.cartItem.update({
            where: { cart_item_id },
            data: { quantity },
        });
        return updatedCartItem;
    });
}
