import {MigrationInterface, QueryRunner} from "typeorm";

export class init1654619404193 implements MigrationInterface {
    name = 'init1654619404193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_e03827c061fbf85fd3aae454aec\``);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_e03827c061fbf85fd3aae454aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_e03827c061fbf85fd3aae454aec\``);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`site\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_e03827c061fbf85fd3aae454aec\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
