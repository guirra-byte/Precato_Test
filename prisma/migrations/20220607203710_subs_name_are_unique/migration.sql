/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `subs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `subs_name_key` ON `subs`(`name`);
