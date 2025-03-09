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
exports.addToCartService = addToCartService;
const prisma_1 = __importDefault(require("../../prisma"));
function addToCartService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, product_id, quantity, }) {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: userId },
            include: { accounts: true },
        });
        if (!user || !user.emailVerified) {
            throw new Error("User not found or not verified");
        }
        const profile = yield prisma_1.default.profile.findUnique({
            where: { user_id: user.id },
        });
        if (!profile) {
            throw new Error("Profile not found");
        }
        const stock = yield prisma_1.default.stock.findFirst({
            where: { product_id },
        });
        if (!stock || stock.quantity < quantity) {
            throw new Error("Insufficient product stock");
        }
        let cart = yield prisma_1.default.cart.findFirst({
            where: { profile_id: profile.profile_id },
            include: { cart_items: true },
        });
        if (!cart) {
            cart = yield prisma_1.default.cart.create({
                data: {
                    profile_id: profile.profile_id,
                    created_at: new Date(),
                    cart_items: {
                        create: [],
                    },
                },
                include: { cart_items: true },
            });
        }
        if (!cart) {
            throw new Error("Failed to create cart");
        }
        const existingCartItem = yield prisma_1.default.cartItem.findFirst({
            where: {
                cart_id: cart.cart_id,
                product_id,
            },
        });
        if (existingCartItem) {
            const updatedCartItem = yield prisma_1.default.cartItem.update({
                where: { cart_item_id: existingCartItem.cart_item_id },
                data: { quantity: existingCartItem.quantity + quantity },
            });
            return updatedCartItem;
        }
        const newCartItem = yield prisma_1.default.cartItem.create({
            data: {
                cart_id: cart.cart_id,
                product_id,
                quantity,
            },
        });
        return newCartItem;
    });
}
