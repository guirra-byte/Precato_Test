/*
  Warnings:

  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `position` on the `messages` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `messagesonsubs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `messageId` on the `messagesonsubs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `messagesonsubs` DROP FOREIGN KEY `messagesOnSubs_messageId_fkey`;

-- DropIndex
DROP INDEX `messages_position_key` ON `messages`;

-- AlterTable
ALTER TABLE `messages` DROP PRIMARY KEY,
    DROP COLUMN `position`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `messagesonsubs` DROP PRIMARY KEY,
    MODIFY `messageId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`subId`, `messageId`);

-- AddForeignKey
ALTER TABLE `messagesOnSubs` ADD CONSTRAINT `messagesOnSubs_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `messages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
