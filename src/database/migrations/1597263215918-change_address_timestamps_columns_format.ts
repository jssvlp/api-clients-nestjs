import {MigrationInterface, QueryRunner} from "typeorm";

export class changeAddressTimestampsColumnsFormat1597263215918 implements MigrationInterface {
    name = 'changeAddressTimestampsColumnsFormat1597263215918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `addresses` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `addresses` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `addresses` CHANGE `updated_at` `updated_at` timestamp(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `addresses` CHANGE `created_at` `created_at` timestamp(0) NOT NULL");
    }

}
