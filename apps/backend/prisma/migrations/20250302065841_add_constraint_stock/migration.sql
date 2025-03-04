/*
  Warnings:

  - A unique constraint covering the columns `[store_id,product_id]` on the table `stock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "stock_product_id_key";

-- CreateTable
CREATE TABLE "Banner" (
    "banner_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("banner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_store_id_product_id_key" ON "stock"("store_id", "product_id");
