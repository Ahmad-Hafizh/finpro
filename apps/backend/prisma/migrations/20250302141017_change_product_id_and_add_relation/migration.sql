/*
  Warnings:

  - Changed the type of `product_id` on the `stock_journal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "stock_journal" DROP COLUMN "product_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stock_journal" ADD CONSTRAINT "stock_journal_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
