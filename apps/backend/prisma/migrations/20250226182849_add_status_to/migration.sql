/*
  Warnings:

  - You are about to drop the column `island` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `address` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderCancel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_contact` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_name` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_code` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "adminPosition" AS ENUM ('store_manager', 'store_delivery', 'store_logistic');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_store_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderCancel" DROP CONSTRAINT "OrderCancel_order_id_fkey";

-- DropForeignKey
ALTER TABLE "admin_order" DROP CONSTRAINT "admin_order_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_order_id_fkey";

-- DropForeignKey
ALTER TABLE "payment_proof" DROP CONSTRAINT "payment_proof_order_id_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "island",
DROP COLUMN "province",
ADD COLUMN     "address_contact" TEXT NOT NULL,
ADD COLUMN     "address_name" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL,
ADD COLUMN     "post_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderCancel";

-- CreateTable
CREATE TABLE "order" (
    "order_id" SERIAL NOT NULL,
    "order_number" TEXT,
    "store_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "total_price" INTEGER NOT NULL,
    "shipping_price" INTEGER,
    "total_payment" INTEGER,
    "tracking_number" TEXT,
    "discount_id" INTEGER,
    "status" "OrderStatus" NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_cancel" (
    "order_cancel_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "canceled_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_cancel_pkey" PRIMARY KEY ("order_cancel_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_order_number_key" ON "order"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "order_cancel_order_id_key" ON "order_cancel"("order_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("discount_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_proof" ADD CONSTRAINT "payment_proof_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_cancel" ADD CONSTRAINT "order_cancel_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_order" ADD CONSTRAINT "admin_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;