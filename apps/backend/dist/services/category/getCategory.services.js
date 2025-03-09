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
exports.getCategory = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getCategory = (pageNumber, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    if (pageNumber && pageSize) {
        const number = parseInt(pageNumber);
        const size = parseInt(pageSize);
        const result = yield prisma_1.default.productCategory.findMany({
            skip: (number - 1) * size,
            take: size,
        });
        const totalItems = yield prisma_1.default.productCategory.count();
        // Calculate total pages
        const totalPages = Math.ceil(totalItems / size);
        return {
            result: result,
            totalItems,
            totalPages,
            currentPage: number,
            pageSize: size,
        };
    }
    else {
        const result = yield prisma_1.default.productCategory.findMany();
        return result;
    }
});
exports.getCategory = getCategory;
