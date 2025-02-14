/*
  Warnings:

  - You are about to drop the column `user_id` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `referral` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profile_id]` on the table `referral` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserVouchers" DROP CONSTRAINT "_UserVouchers_A_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_account_id_fkey";

-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_account_id_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "referral" DROP CONSTRAINT "referral_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_account_id_fkey";

-- DropIndex
DROP INDEX "admin_account_id_key";

-- DropIndex
DROP INDEX "referral_user_id_key";

-- DropIndex
DROP INDEX "user_account_id_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
DROP COLUMN "account_id",
DROP COLUMN "isVerified",
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "address" DROP COLUMN "account_id",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "account_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "referral" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "account_id",
ADD COLUMN     "profile_id" SERIAL NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "pfp_url" DROP NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("profile_id");
DROP SEQUENCE "user_user_id_seq";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_user_id_key" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_id_key" ON "admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_profile_id_key" ON "referral"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user"("profile_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user"("profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserVouchers" ADD CONSTRAINT "_UserVouchers_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("profile_id") ON DELETE CASCADE ON UPDATE CASCADE;
