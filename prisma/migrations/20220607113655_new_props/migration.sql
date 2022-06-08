/*
  Warnings:

  - A unique constraint covering the columns `[template_name]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `messages_template_name_key` ON `messages`(`template_name`);
