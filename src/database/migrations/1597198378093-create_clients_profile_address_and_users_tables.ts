import {MigrationInterface, QueryRunner} from "typeorm";

export class createClientsProfileAddressAndUsersTables1597198378093 implements MigrationInterface {
    name = 'createClientsProfileAddressAndUsersTables1597198378093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profiles` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `picture` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'active', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `first_last_name` varchar(100) NOT NULL, `second_last_name` varchar(100) NULL, `birth_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `gender` varchar(255) NOT NULL, `birthPlace` varchar(100) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'active', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profileId` int NULL, UNIQUE INDEX `REL_4cc48db2edde4703f76fc15ec4` (`profileId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `addresses` (`id` int NOT NULL AUTO_INCREMENT, `country` varchar(100) NOT NULL, `state` varchar(100) NOT NULL, `city` varchar(100) NOT NULL, `postal_code` varchar(10) NULL, `address_line_one` varchar(150) NOT NULL, `address_line_two` varchar(150) NULL, `created_at` timestamp NOT NULL, `updated_at` timestamp NOT NULL, `clientId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'active', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_4cc48db2edde4703f76fc15ec40` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `addresses` ADD CONSTRAINT `FK_ae1b6a2290ac79ac41dff9aa574` FOREIGN KEY (`clientId`) REFERENCES `clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `addresses` DROP FOREIGN KEY `FK_ae1b6a2290ac79ac41dff9aa574`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_4cc48db2edde4703f76fc15ec40`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `addresses`");
        await queryRunner.query("DROP INDEX `REL_4cc48db2edde4703f76fc15ec4` ON `clients`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP TABLE `profiles`");
    }

}
