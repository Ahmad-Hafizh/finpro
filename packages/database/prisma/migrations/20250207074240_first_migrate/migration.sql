-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'super_admin');

-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('in', 'out', 'transfer');

-- CreateEnum
CREATE TYPE "ActionEnum" AS ENUM ('konfirmasi_pembayaran', 'kirim_pesanan', 'batalkan_pesanan');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('menunggu_pembayaran', 'menunggu_konfirmasi', 'diproses', 'dikirim', 'pesanan_dikonfirmasi', 'dibatalkan');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "account" (
    "account_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "referred_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "pfp_url" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "referral" (
    "referral_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "referral_code" TEXT NOT NULL,

    CONSTRAINT "referral_pkey" PRIMARY KEY ("referral_id")
);

-- CreateTable
CREATE TABLE "address" (
    "address_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "island" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "admin" (
    "admin_id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "store" (
    "store_id" SERIAL NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "stock" (
    "stock_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "stock_journal" (
    "stock_journal_id" SERIAL NOT NULL,
    "store_id" INTEGER NOT NULL,
    "stock_id" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_journal_pkey" PRIMARY KEY ("stock_journal_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_category_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "product_img" (
    "image_id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_img_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "product_category_id" SERIAL NOT NULL,
    "product_category_name" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "voucher_store" (
    "voucher_store_id" SERIAL NOT NULL,
    "voucher_store_code" TEXT NOT NULL,
    "voucher_store_amount_percentage" INTEGER NOT NULL,
    "voucher_store_exact_nominal" INTEGER NOT NULL,
    "voucher_store_minimum_buy" INTEGER NOT NULL,
    "voucher_store_maximum_nominal" INTEGER NOT NULL,
    "voucher_store_startdate" TIMESTAMP(3) NOT NULL,
    "voucher_store_enddate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "admin_responsible" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "voucher_store_pkey" PRIMARY KEY ("voucher_store_id")
);

-- CreateTable
CREATE TABLE "voucher_ongkir" (
    "voucher_ongkir_id" SERIAL NOT NULL,
    "voucher_ongkir_code" TEXT NOT NULL,
    "voucher_ongkir_nominal" INTEGER NOT NULL,
    "voucher_ongkir_startdate" TIMESTAMP(3) NOT NULL,
    "voucher_ongkir_enddate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "admin_responsible" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "voucher_ongkir_pkey" PRIMARY KEY ("voucher_ongkir_id")
);

-- CreateTable
CREATE TABLE "voucher_product" (
    "voucher_product_id" SERIAL NOT NULL,
    "voucher_product_code" TEXT NOT NULL,
    "voucher_product_nominal" INTEGER NOT NULL,
    "voucher_product_startdate" TIMESTAMP(3) NOT NULL,
    "voucher_product_enddate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "admin_responsible" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "voucher_product_pkey" PRIMARY KEY ("voucher_product_id")
);

-- CreateTable
CREATE TABLE "discount" (
    "discount_id" SERIAL NOT NULL,
    "discount_product" TEXT NOT NULL,
    "discount_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "discount_startdate" TIMESTAMP(3) NOT NULL,
    "discount_enddate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("discount_id")
);

-- CreateTable
CREATE TABLE "cart" (
    "cart_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cart_item_id" SERIAL NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cart_item_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "order_item_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "payment_proof" (
    "payment_proof_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL,

    CONSTRAINT "payment_proof_pkey" PRIMARY KEY ("payment_proof_id")
);

-- CreateTable
CREATE TABLE "OrderCancel" (
    "order_cancel_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "canceled_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderCancel_pkey" PRIMARY KEY ("order_cancel_id")
);

-- CreateTable
CREATE TABLE "admin_order" (
    "admin_order_id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "action" "ActionEnum" NOT NULL,
    "action_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_order_pkey" PRIMARY KEY ("admin_order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_id_key" ON "user"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_user_id_key" ON "referral"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_account_id_key" ON "admin"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "store_store_name_key" ON "store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_id_key" ON "stock"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "stock_journal_product_id_key" ON "stock_journal"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_name_key" ON "product"("product_name");

-- CreateIndex
CREATE UNIQUE INDEX "product_category_product_category_name_key" ON "product_category"("product_category_name");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_store_voucher_store_code_key" ON "voucher_store"("voucher_store_code");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_ongkir_voucher_ongkir_code_key" ON "voucher_ongkir"("voucher_ongkir_code");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_product_voucher_product_code_key" ON "voucher_product"("voucher_product_code");

-- CreateIndex
CREATE UNIQUE INDEX "payment_proof_order_id_key" ON "payment_proof"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderCancel_order_id_key" ON "OrderCancel"("order_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referred_id_fkey" FOREIGN KEY ("referred_id") REFERENCES "referral"("referral_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_journal" ADD CONSTRAINT "stock_journal_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_journal" ADD CONSTRAINT "stock_journal_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("product_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_img" ADD CONSTRAINT "product_img_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_proof" ADD CONSTRAINT "payment_proof_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderCancel" ADD CONSTRAINT "OrderCancel_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_order" ADD CONSTRAINT "admin_order_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_order" ADD CONSTRAINT "admin_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
