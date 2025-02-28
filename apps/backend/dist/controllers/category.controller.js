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
exports.CategoryController = void 0;
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const getCategory_services_1 = require("../services/category/getCategory.services");
const createCategory_services_1 = require("../services/category/createCategory.services");
const updateCategory_sevices_1 = require("../services/category/updateCategory.sevices");
const deleteCategory_services_1 = require("../services/category/deleteCategory.services");
class CategoryController {
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, getCategory_services_1.getCategory)();
                return responseHandler_1.default.success(res, 200, 'Get Category Data Success', result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'Internal Server Error', error);
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const objectPayload = { name };
                const result = yield (0, createCategory_services_1.createCategory)(objectPayload);
                return responseHandler_1.default.success(res, 200, 'Create Category Success', result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'Internal Server Error', error);
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.name;
                const id = req.body.id;
                const objectPayload = { id, name };
                const result = yield (0, updateCategory_sevices_1.updateCategory)(objectPayload);
                return responseHandler_1.default.success(res, 200, 'Update Category Success', result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'Internal Server Error', error);
            }
        });
    }
    //MASIH HARD DELETE
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const result = yield (0, deleteCategory_services_1.deleteCategory)({ id });
                return responseHandler_1.default.success(res, 200, 'Delete category success', result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, 'Internal Server Error', error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
