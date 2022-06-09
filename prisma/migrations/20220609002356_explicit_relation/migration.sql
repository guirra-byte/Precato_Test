/*
  Warnings:

  - You are about to drop the column `message_id` on the `subs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_sub_id_fkey`;

-- DropIndex
DROP INDEX `subs_message_id_key` ON `subs`;

-- AlterTable
ALTER TABLE `subs` DROP COLUMN `message_id`;

-- CreateTable
CREATE TABLE `messagesOnSubs` (
    `subId` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`subId`, `messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messagesOnSubs` ADD CONSTRAINT `messagesOnSubs_subId_fkey` FOREIGN KEY (`subId`) REFERENCES `subs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messagesOnSubs` ADD CONSTRAINT `messagesOnSubs_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
