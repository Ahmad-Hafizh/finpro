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
const prisma_1 = __importDefault(require("../prisma"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const getAdmin_services_1 = require("../services/admin/getAdmin.services");
const hashPassword_1 = require("../utils/hashPassword");
const findUser_1 = require("../utils/findUser");
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
                const { admin_id, store_id, position } = req.body;
                const checkAdmin = yield prisma_1.default.admin.findUnique({
                    where: { admin_id: parseInt(admin_id) },
                });
                if (!checkAdmin) {
                    throw new Error("Admin not found");
                }
                const result = yield prisma_1.default.admin.update({
                    where: {
                        admin_id,
                    },
                    data: {
                        position: position,
                        store_id: parseInt(store_id),
                    },
                });
                return responseHandler_1.default.success(res, 200, "Update admin success", result);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server error", error);
            }
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password, store_id, phone, position } = req.body;
                const user = yield (0, findUser_1.findUser)(email);
                if (user)
                    return responseHandler_1.default.error(res, 404, "Email already used");
                const newUser = yield prisma_1.default.user.create({
                    data: {
                        email,
                        name,
                        password: yield (0, hashPassword_1.hashPassword)(password),
                        role: "admin",
                        emailVerified: new Date().toISOString(),
                    },
                });
                yield prisma_1.default.admin.create({
                    data: {
                        user_id: newUser.id,
                        phone,
                        store_id: parseInt(store_id),
                        position,
                    },
                });
                return responseHandler_1.default.success(res, 200, "Create Admin Success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    assignStoreAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin_id, store_id } = req.body;
                yield prisma_1.default.admin.update({
                    where: { admin_id },
                    data: { store_id },
                });
                return responseHandler_1.default.success(res, 200, "Assign Admin Success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    checkAdminDetailRoleFromFrontend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin_id, email } = req.body;
                let result = [];
                if (admin_id) {
                    const getAdminInfo = yield prisma_1.default.admin.findFirst({
                        where: Object.assign({}, (admin_id ? { admin_id: admin_id } : {})),
                    });
                    result.push(getAdminInfo);
                }
                if (email) {
                    const getAdminInfoByEmail = yield prisma_1.default.admin.findFirst({
                        where: {
                            user: {
                                email: email,
                            },
                        },
                        include: {
                            user: true,
                            store: true,
                        },
                    });
                    console.log("GET INFOR BY ADMIN : ", getAdminInfoByEmail);
                    if (!getAdminInfoByEmail) {
                        const getSuperAdminByEmail = yield prisma_1.default.user.findFirst({
                            where: {
                                email: email,
                            },
                        });
                        result.push(getSuperAdminByEmail);
                    }
                    result.push(getAdminInfoByEmail);
                }
                return responseHandler_1.default.success(res, 200, "Get Admin success", result);
            }
            catch (error) {
                console.log("Error : ", error);
            }
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin_id } = req.body;
                const deleteAdmin = yield prisma_1.default.admin.update({
                    where: {
                        admin_id: parseInt(admin_id),
                    },
                    data: {
                        deleted_at: new Date(),
                    },
                });
                return responseHandler_1.default.success(res, 200, "Delete admin success", deleteAdmin);
            }
            catch (error) {
                console.log("Ini error: ", error);
                return responseHandler_1.default.error(res, 500, "Internal server error", error);
            }
        });
    }
}
exports.AdminController = AdminController;
