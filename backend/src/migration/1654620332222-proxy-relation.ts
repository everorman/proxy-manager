import {MigrationInterface, QueryRunner} from "typeorm";

export class proxyRelation1654620332222 implements MigrationInterface {
    name = 'proxyRelation1654620332222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`proxy\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ip\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`region\` varchar(255) NOT NULL, \`organization\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`created_by\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`DROP TABLE \`proxy\``);
    }

}
