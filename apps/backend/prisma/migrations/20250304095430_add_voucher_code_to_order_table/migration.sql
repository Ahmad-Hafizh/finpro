/*
  Warnings:

  - You are about to drop the column `discount_id` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_discount_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "discount_id",
ADD COLUMN     "voucher_code" TEXT;
