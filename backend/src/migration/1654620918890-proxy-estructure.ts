import {MigrationInterface, QueryRunner} from "typeorm";

export class proxyEstructure1654620918890 implements MigrationInterface {
    name = 'proxyEstructure1654620918890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP COLUMN \`region\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP COLUMN \`organization\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP FOREIGN KEY \`FK_ff9cbf90288fe0deab571baa128\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_e03827c061fbf85fd3aae454aec\``);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD CONSTRAINT \`FK_ff9cbf90288fe0deab571baa128\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_e03827c061fbf85fd3aae454aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_e03827c061fbf85fd3aae454aec\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP FOREIGN KEY \`FK_ff9cbf90288fe0deab571baa128\``);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_e03827c061fbf85fd3aae454aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proxy\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD CONSTRAINT \`FK_ff9cbf90288fe0deab571baa128\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD \`score\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD \`organization\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD \`region\` varchar(255) NOT NULL`);
    }

}
