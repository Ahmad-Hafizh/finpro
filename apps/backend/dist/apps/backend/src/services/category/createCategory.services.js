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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const client_1 = require("../../../../../packages/database/src/client");
const createCategory = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, }) {
    const result = yield client_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const checkCategoryName = yield tx.productCategory.findFirst({
            where: {
                product_category_name: name,
            },
        });
        if (checkCategoryName) {
            throw new Error("Product has already been added. Cannot add same product.");
        }
        const createCategory = yield tx.productCategory.create({
            data: {
                product_category_name: name,
            },
        });
    }));
    return result;
});
exports.createCategory = createCategory;
