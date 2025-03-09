"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cart_router_1 = require("./routers/cart.router");
const account_router_1 = require("./routers/account.router");
const admin_router_1 = require("./routers/admin.router");
const product_router_1 = require("./routers/product.router");
const category_router_1 = require("./routers/category.router");
const order_router_1 = require("./routers/order.router");
const address_router_1 = require("./routers/address.router");
const store_router_1 = require("./routers/store.router");
const adminOrder_router_1 = require("./routers/adminOrder.router");
const stock_router_1 = require("./routers/stock.router");
const stockReport_router_1 = require("./routers/stockReport.router");
const voucher_router_1 = require("./routers/voucher.router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./utils/scheduler");
const PORT = 8090;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get("/", (req, res) => {
            return res.status(200).send("test api");
        });
        const accountRouter = new account_router_1.AccountRouter();
        this.app.use("/account", accountRouter.getRouter());
        const storeRouter = new store_router_1.StoreRouter();
        this.app.use("/store", storeRouter.getRouter());
        const cartRouter = new cart_router_1.CartRouter();
        this.app.use("/cart", cartRouter.getRouter());
        const adminRouter = new admin_router_1.AdminRouter();
        this.app.use("/admin", adminRouter.getRouter());
        const productRouter = new product_router_1.ProductRouter();
        this.app.use("/product", productRouter.getRouter());
        const categoryRouter = new category_router_1.CategoryRouter();
        this.app.use("/category", categoryRouter.getRouter());
        const orderRouter = new order_router_1.OrderRouter();
        this.app.use("/order", orderRouter.getRouter());
        const addressRouter = new address_router_1.AddressRouter();
        this.app.use("/address", addressRouter.getRouter());
        const adminOrderRouter = new adminOrder_router_1.AdminOrderRouter();
        this.app.use("/admin-order", adminOrderRouter.getRouter());
        const stockRouter = new stock_router_1.StockRouter();
        this.app.use("/stock", stockRouter.getRouter());
        const stockReportRouter = new stockReport_router_1.StockReportRouter();
        this.app.use("/stockreport", stockReportRouter.getRouter());
        const voucherRouter = new voucher_router_1.VoucherRouter();
        this.app.use("/voucher", voucherRouter.getRouter());
    }
    start() {
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}
exports.default = new App();
