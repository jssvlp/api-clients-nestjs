import {MigrationInterface, QueryRunner} from "typeorm";

export class craeteClientProfileAddressAndUsersTables1597210028087 implements MigrationInterface {
    name = 'craeteClientProfileAddressAndUsersTables1597210028087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profiles` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(100) NOT NULL, `username` varchar(25) NOT NULL, `password` varchar(255) NOT NULL, `picture` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'active', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_5b49bd22c967ce2829ca8f1772` (`email`), UNIQUE INDEX `IDX_d1ea35db5be7c08520d70dc03f` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `first_last_name` varchar(100) NOT NULL, `second_last_name` varchar(100) NULL, `birth_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `gender` varchar(255) NOT NULL, `birth_place` varchar(100) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'active', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `profile_id` int NULL, UNIQUE INDEX `REL_826d0742803aba8b2bcfd32c1c` (`profile_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `addresses` (`id` int NOT NULL AUTO_INCREMENT, `country` varchar(100) NOT NULL, `state` varchar(100) NOT NULL, `city` varchar(100) NOT NULL, `postal_code` varchar(10) NULL, `address_line_one` varchar(150) NOT NULL, `address_line_two` varchar(150) NULL, `created_at` timestamp NOT NULL, `updated_at` timestamp NOT NULL, `client_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_826d0742803aba8b2bcfd32c1c3` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `addresses` ADD CONSTRAINT `FK_ef93e5d3f0eb70c0c1983fb462d` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `addresses` DROP FOREIGN KEY `FK_ef93e5d3f0eb70c0c1983fb462d`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_826d0742803aba8b2bcfd32c1c3`");
        await queryRunner.query("DROP TABLE `addresses`");
        await queryRunner.query("DROP INDEX `REL_826d0742803aba8b2bcfd32c1c` ON `clients`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP INDEX `IDX_d1ea35db5be7c08520d70dc03f` ON `profiles`");
        await queryRunner.query("DROP INDEX `IDX_5b49bd22c967ce2829ca8f1772` ON `profiles`");
        await queryRunner.query("DROP TABLE `profiles`");
    }

}
