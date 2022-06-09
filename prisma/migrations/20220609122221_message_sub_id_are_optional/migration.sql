-- DropIndex
DROP INDEX `messages_sub_id_fkey` ON `messages`;

-- AlterTable
ALTER TABLE `messages` MODIFY `sub_id` VARCHAR(191) NULL;
