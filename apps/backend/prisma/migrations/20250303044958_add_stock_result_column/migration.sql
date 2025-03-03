/*
  Warnings:

  - Added the required column `stock_result` to the `stock_journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_journal" ADD COLUMN     "stock_result" INTEGER NOT NULL;
