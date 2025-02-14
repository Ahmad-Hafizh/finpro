/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `accounts` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `account_id` was added to the `accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id");

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "users_user_id_seq";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
