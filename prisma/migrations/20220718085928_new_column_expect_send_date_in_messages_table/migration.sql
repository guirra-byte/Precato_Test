/*
  Warnings:

  - Added the required column `expect_send_date` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN `expect_send_date` VARCHAR(191) NOT NULL;
