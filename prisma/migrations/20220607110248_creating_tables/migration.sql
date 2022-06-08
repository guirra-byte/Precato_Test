-- CreateTable
CREATE TABLE `subs` (
    `id` VARCHAR(191) NOT NULL,
    `subs_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `last_message` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(191) NOT NULL,
    `message_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `subs_user_id_key`(`user_id`),
    UNIQUE INDEX `subs_message_id_key`(`message_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `sub_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` VARCHAR(191) NOT NULL,
    `template_name` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `sub_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_sub_id_fkey` FOREIGN KEY (`sub_id`) REFERENCES `subs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
