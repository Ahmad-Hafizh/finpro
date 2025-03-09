"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRouter = void 0;
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const upload_middleware_1 = require("../middleware/upload.middleware");
class AccountRouter {
    constructor() {
        this.route = (0, express_1.Router)();
        this.accountController = new account_controller_1.AccountController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.route.post('/sign-up', this.accountController.signUp);
        this.route.post('/verify', verifyToken_1.verifyToken, this.accountController.verifyEmailsetPassword);
        this.route.post('/ask-verify', this.accountController.askVerify);
        this.route.post('/sign-in', this.accountController.signIn);
        this.route.post('/forgot-password', this.accountController.forgotPassword);
        this.route.post('/recover-password', this.accountController.resetPassword);
        this.route.post('/get-user-by-id', this.accountController.getUserById);
        this.route.post('/get-role', this.accountController.getRoleByEmail);
        this.route.post('/oauth-signup', this.accountController.createProfileReferral);
        this.route.patch('/update-user', this.accountController.updateUser);
        this.route.patch('/update-pfp', verifyToken_1.verifyToken, upload_middleware_1.upload.single('profile_image'), this.accountController.updatePfp);
    }
    getRouter() {
        return this.route;
    }
}
exports.AccountRouter = AccountRouter;
