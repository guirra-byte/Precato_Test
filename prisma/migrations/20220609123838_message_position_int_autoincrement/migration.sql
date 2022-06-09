/*
  Warnings:
  - A unique constraint covering the columns `[position]` on the table `messages` will be added. If there are existing duplicate values, this will fail.
  - Made the column `position` on table `messages` required. This step will fail if there are existing NULL values in that column.
*/

-- AlterTable

-- CreateIndex

CREATE UNIQUE INDEX `messages_position_key` ON `messages`(`position`);