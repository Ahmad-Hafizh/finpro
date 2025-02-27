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
exports.AccountController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const hashPassword_1 = require("../utils/hashPassword");
const bcrypt_1 = require("bcrypt");
const nodemailer_1 = require("../config/nodemailer");
const jsonwebtoken_1 = require("jsonwebtoken");
const findUser_1 = require("../utils/findUser");
const authSchema_1 = require("../schemas/authSchema");
const cloudinary_1 = require("../utils/cloudinary");
class AccountController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email, name } = authSchema_1.signUpSchema.parse(req.body);
                const exist = yield (0, findUser_1.findUser)(email);
                if (exist) {
                    return responseHandler_1.default.error(res, 404, "user is already exist");
                }
                const createUserFlow = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    const user = yield tx.user.create({
                        data: {
                            email: email.toLowerCase(),
                            name,
                        },
                    });
                    const referralCode = `${(_b = (_a = user.name) === null || _a === void 0 ? void 0 : _a.slice(0, 4).toUpperCase()) !== null && _b !== void 0 ? _b : "USER"}${Math.round(Math.random() * 10000).toString()}`;
                    const authToken = (0, jsonwebtoken_1.sign)({ email: user.email }, process.env.TOKEN_KEY || "secretkey", { expiresIn: "1h" });
                    const profile = yield tx.profile.create({
                        data: {
                            user_id: user.id,
                        },
                    });
                    yield tx.referral.create({
                        data: {
                            profile_id: profile.profile_id,
                            referral_code: referralCode,
                        },
                    });
                    return { user, authToken };
                }));
                yield nodemailer_1.transporter.sendMail({
                    from: "grocery",
                    to: (_a = createUserFlow.user.email) !== null && _a !== void 0 ? _a : "",
                    subject: "email verification and set password",
                    html: `<div>
                <h1>Thank you ${createUserFlow.user.name}, for registrater your account</h1>
                <p>klik link below to verify your account</p>
                <a href='http://localhost:3000/verify?a_t=${createUserFlow.authToken}'>Verify Account</a>
                </div>`,
                });
                return responseHandler_1.default.success(res, 200, "sign up success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    verifyEmailsetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                const newAccount = yield prisma_1.default.user.update({
                    where: { email: user.email },
                    data: {
                        emailVerified: new Date().toISOString(),
                        password: yield (0, hashPassword_1.hashPassword)(req.body.password),
                    },
                });
                return responseHandler_1.default.success(res, 200, "verify success", newAccount);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const validateData = signInSchema.parse(req.body);
                // const { email, password } = validateData;
                const { email, password } = req.body;
                const userExist = yield (0, findUser_1.findUser)(email);
                if (!userExist) {
                    return responseHandler_1.default.error(res, 404, "user not found");
                }
                if (!userExist.password) {
                    return responseHandler_1.default.error(res, 404, "Password is not set");
                }
                const compare = (0, bcrypt_1.compareSync)(password, userExist.password);
                if (!compare) {
                    return responseHandler_1.default.error(res, 404, "Password is incorrect");
                }
                return responseHandler_1.default.success(res, 200, "Sign in is success", userExist);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        id: req.body.id,
                    },
                    include: {
                        accounts: true,
                    },
                });
                if (!user) {
                    return responseHandler_1.default.error(res, 404, "User not found");
                }
                return responseHandler_1.default.success(res, 200, "Sign in is success", user);
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    createProfileReferral(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, id } = req.body;
                const existProfile = yield prisma_1.default.profile.findUnique({
                    where: { user_id: id },
                });
                if (existProfile) {
                    return responseHandler_1.default.success(res, 200, "profile is already exist");
                }
                yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const referralCode = `${(_a = name === null || name === void 0 ? void 0 : name.slice(0, 4).toUpperCase()) !== null && _a !== void 0 ? _a : "USER"}${Math.round(Math.random() * 10000).toString()}`;
                    const profile = yield tx.profile.create({
                        data: {
                            user_id: id,
                        },
                    });
                    yield tx.referral.create({
                        data: {
                            profile_id: profile.profile_id,
                            referral_code: referralCode,
                        },
                    });
                }));
                return responseHandler_1.default.success(res, 200, "create profile and referral success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email } = req.body;
                const userExist = yield (0, findUser_1.findUser)(email);
                if (!userExist) {
                    return responseHandler_1.default.error(res, 404, "Account not found");
                }
                const authToken = (0, jsonwebtoken_1.sign)({ email: userExist.email }, process.env.TOKEN_KEY || "secretkey", { expiresIn: "1h" });
                yield nodemailer_1.transporter.sendMail({
                    from: "grocery",
                    to: (_a = userExist.email) !== null && _a !== void 0 ? _a : "",
                    subject: "forgot password",
                    html: `<div>
        <h1>Hey ${userExist.name}, it seems you forgot your password</h1>
        <p>klik link below to recover your password</p>
        <a href='${process.env.FE_URL}/forgot-password/${authToken}'>Forgot password</a>
        </div>`,
                });
                return responseHandler_1.default.success(res, 200, "recover your password email is sent");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                yield prisma_1.default.user.update({
                    where: { email: user.email },
                    data: { password: yield (0, hashPassword_1.hashPassword)(req.body.password) },
                });
                return responseHandler_1.default.success(res, 201, "Reset password is success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, phone } = req.body;
                const exist = yield (0, findUser_1.findUser)(email);
                if (!exist) {
                    return responseHandler_1.default.error(res, 404, "user not found");
                }
                yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    yield tx.user.update({
                        where: { id: exist.id },
                        data: { name },
                    });
                    if (phone) {
                        yield tx.profile.update({
                            where: { user_id: exist.id },
                            data: { phone },
                        });
                    }
                }));
                return responseHandler_1.default.success(res, 200, "update success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
    updatePfp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { email } = req.body;
                const user = yield (0, findUser_1.findUser)(email);
                if (!(user === null || user === void 0 ? void 0 : user.email)) {
                    return responseHandler_1.default.error(res, 400, "User not found");
                }
                if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)) {
                    return responseHandler_1.default.error(res, 400, "file not found");
                }
                const image = yield (0, cloudinary_1.uploadImage)((_b = req.file) === null || _b === void 0 ? void 0 : _b.path, "profile_image");
                yield prisma_1.default.user.update({
                    where: { email: user.email },
                    data: {
                        image: image.result.secure_url,
                    },
                });
                return responseHandler_1.default.success(res, 200, "Update profile picture success");
            }
            catch (error) {
                return responseHandler_1.default.error(res, 500, "Internal Server Error", error);
            }
        });
    }
}
exports.AccountController = AccountController;
