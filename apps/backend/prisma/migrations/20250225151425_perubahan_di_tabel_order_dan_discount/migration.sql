-- DropIndex
DROP INDEX "stock_journal_product_id_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discount_id" INTEGER,
ADD COLUMN     "shipping_price" INTEGER,
ADD COLUMN     "total_payment" INTEGER,
ADD COLUMN     "tracking_number" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discount"("discount_id") ON DELETE SET NULL ON UPDATE CASCADE;