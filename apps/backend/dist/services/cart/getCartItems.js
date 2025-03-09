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
exports.getCartItemsService = getCartItemsService;
const prisma_1 = __importDefault(require("../../prisma"));
function getCartItemsService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const profile = yield prisma_1.default.profile.findUnique({
            where: { user_id: userId },
        });
        if (!profile) {
            throw new Error("Profile not found");
        }
        const cart = yield prisma_1.default.cart.findFirst({
            where: { profile_id: profile.profile_id },
            include: {
                cart_items: {
                    include: {
                        product: {
                            include: {
                                product_img: true,
                                stock: {
                                    include: {
                                        store: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!cart) {
            return { items: [], total: 0 };
        }
        const itemsWithTotal = cart.cart_items.map((item) => {
            var _a, _b, _c;
            return (Object.assign(Object.assign({}, item), { subtotal: item.quantity * item.product.product_price, store_name: (_c = (_b = (_a = item.product.stock[0]) === null || _a === void 0 ? void 0 : _a.store) === null || _b === void 0 ? void 0 : _b.store_name) !== null && _c !== void 0 ? _c : "Unknown Store", product: Object.assign(Object.assign({}, item.product), { product_img: item.product.product_img
                        ? item.product.product_img.map((img) => ({
                            url: img.image_url,
                        }))
                        : [], stock: item.product.stock.length > 0
                        ? Object.assign(Object.assign({}, item.product.stock[0]), { store: item.product.stock[0].store }) : null }) }));
        });
        const total = itemsWithTotal.reduce((sum, item) => sum + item.subtotal, 0);
        return {
            items: itemsWithTotal,
            total,
        };
    });
}
