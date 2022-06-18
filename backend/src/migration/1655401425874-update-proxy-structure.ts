import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProxyStructure1655401425874 implements MigrationInterface {
    name = 'updateProxyStructure1655401425874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_ff9cbf90288fe0deab571baa128\` ON \`proxy\``);
        await queryRunner.query(`DROP INDEX \`FK_e03827c061fbf85fd3aae454aec\` ON \`site\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD \`owner\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`proxy\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`proxy\` ADD CONSTRAINT \`FK_ff9cbf90288fe0deab571baa128\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_e03827c061fbf85fd3aae454aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_e03827c061fbf85fd3aae454aec\``);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP FOREIGN KEY \`FK_ff9cbf90288fe0deab571baa128\``);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`proxy\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`proxy\` DROP COLUMN \`owner\``);
        await queryRunner.query(`CREATE INDEX \`FK_e03827c061fbf85fd3aae454aec\` ON \`site\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_ff9cbf90288fe0deab571baa128\` ON \`proxy\` (\`userId\`)`);
    }

}
