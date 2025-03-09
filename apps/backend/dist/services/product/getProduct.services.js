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
exports.findProduct = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const findProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ category, pageNumber, pageSize, keyword, sortBy, deletedAt, theStore }) {
    console.log('category in services :', category);
    console.log('Sort by :', sortBy);
    console.log('Deleted at :', deletedAt);
    const categories = category ? (Array.isArray(category) ? category.map(String) : category.split(',')) : [];
    const result = yield prisma_1.default.product.findMany({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {
            AND: [
                categories.length > 0
                    ? {
                        product_category: {
                            product_category_name: { in: categories },
                        },
                    }
                    : {},
                keyword
                    ? {
                        OR: [
                            { product_name: { contains: keyword, mode: 'insensitive' } },
                            {
                                product_description: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    }
                    : {},
                deletedAt === 'true' ? { deletedAt: { not: null } } : deletedAt === 'false' ? { deletedAt: null } : {},
                theStore ? { stock: { some: { store_id: parseInt(theStore) } } } : {},
            ],
        },
        orderBy: sortBy
            ? sortBy === 'name-asc'
                ? { product_name: 'asc' }
                : sortBy === 'name-desc'
                    ? { product_name: 'desc' }
                    : sortBy === 'price-asc'
                        ? { product_price: 'asc' }
                        : sortBy === 'price-desc'
                            ? { product_price: 'desc' }
                            : undefined
            : undefined,
        include: {
            stock: true,
            product_img: true,
            product_category: true,
            voucher: true,
        },
    });
    const totalItems = yield prisma_1.default.product.count({
        where: {
            AND: [
                category
                    ? {
                        product_category: {
                            product_category_name: category,
                        },
                    }
                    : {},
                keyword
                    ? {
                        OR: [
                            { product_name: { contains: keyword, mode: 'insensitive' } },
                            {
                                product_description: {
                                    contains: keyword,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    }
                    : {},
                deletedAt === 'true' ? { deletedAt: { not: null } } : deletedAt === 'false' ? { deletedAt: null } : {},
            ],
        },
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    return { products: result, totalItems, totalPages };
});
exports.findProduct = findProduct;
