/*
  Warnings:

  - You are about to drop the column `user_id` on the `voucher_store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[store_id]` on the table `voucher_ongkir` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "voucher_store" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_UserVouchers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserVouchers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserVouchers_B_index" ON "_UserVouchers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "voucher_ongkir_store_id_key" ON "voucher_ongkir"("store_id");

-- AddForeignKey
ALTER TABLE "voucher_store" ADD CONSTRAINT "voucher_store_admin_responsible_fkey" FOREIGN KEY ("admin_responsible") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_store" ADD CONSTRAINT "voucher_store_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_ongkir" ADD CONSTRAINT "voucher_ongkir_admin_responsible_fkey" FOREIGN KEY ("admin_responsible") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_ongkir" ADD CONSTRAINT "voucher_ongkir_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_product" ADD CONSTRAINT "voucher_product_admin_responsible_fkey" FOREIGN KEY ("admin_responsible") REFERENCES "admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_product" ADD CONSTRAINT "voucher_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserVouchers" ADD CONSTRAINT "_UserVouchers_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserVouchers" ADD CONSTRAINT "_UserVouchers_B_fkey" FOREIGN KEY ("B") REFERENCES "voucher_store"("voucher_store_id") ON DELETE CASCADE ON UPDATE CASCADE;
