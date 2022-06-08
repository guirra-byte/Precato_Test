/*
  Warnings:

  - You are about to drop the column `user_id` on the `subs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `subs_user_id_key` ON `subs`;

-- AlterTable
ALTER TABLE `subs` DROP COLUMN `user_id`;

-- CreateIndex
CREATE UNIQUE INDEX `users_sub_id_key` ON `users`(`sub_id`);
