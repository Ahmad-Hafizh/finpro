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
exports.AdminController = void 0;
const client_1 = require("../../../../packages/database/src/client");
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const getAdmin_services_1 = require("../services/admin/getAdmin.services");
class AdminController {
    getAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeNew, page, keywordNew } = req.query;
                const pageNumber = parseInt(page) || 1;
                const pageSize = 6;
                const store = storeNew;
                const keyword = keywordNew;
                const objectP = { store, pageNumber, pageSize, keyword };
                const result = yield (0, getAdmin_services_1.findAdmin)(objectP);
                return responseHandler_1.default.success(res, 200, "Get Admin Data Success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin_id, user_id, store_id, position } = req.body;
                const checkAdmin = yield client_1.prisma.admin.findUnique({
                    where: { admin_id: admin_id },
                });
                if (!checkAdmin) {
                    throw new Error("Admin not found");
                }
                const result = yield client_1.prisma.admin.update({
                    where: {
                        admin_id: admin_id,
                    },
                    data: {
                        position: position,
                        store_id: store_id,
                    },
                });
                return responseHandler_1.default.success(res, 200, "Update admin success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 200, "Update admin success", error);
            }
        });
    }
}
exports.AdminController = AdminController;
