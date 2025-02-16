import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1663359684344 implements MigrationInterface {
    name = 'initialMigration1663359684344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" uuid NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "description" character varying(300) NOT NULL, "link" character varying NOT NULL, "clubId" uuid, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_club" ("id" uuid NOT NULL, "userId" uuid, "clubId" uuid, CONSTRAINT "PK_4f89a8eafafbd7c3193dcff66db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(101) NOT NULL, "avatar" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "threadId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "thread" ("id" uuid NOT NULL, "title" character varying(100) NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clubId" uuid, "authorId" uuid, CONSTRAINT "PK_cabc0f3f27d7b1c70cf64623e02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clubs" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "cover" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "admId" uuid, CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "club_book" ("id" uuid NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "clubId" uuid, "bookId" uuid, CONSTRAINT "PK_127a5ce44229e0a8ae6657b8ff0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "author" character varying(50) NOT NULL, "description" character varying NOT NULL, "cover" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "meetings" ADD CONSTRAINT "FK_d7eee1e30ec6bd6dc4a58d7fa85" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_bbd870a86349a44a70cf8364de6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_cdb22098ad875e1d2bf1d85556e" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_b148d2f5a22e7904160c69b09f8" FOREIGN KEY ("threadId") REFERENCES "thread"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "thread" ADD CONSTRAINT "FK_8a5e72ea462c914e33d7cf97849" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "thread" ADD CONSTRAINT "FK_7060c5e0b10f141ce2ca501bc13" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clubs" ADD CONSTRAINT "FK_7e3f571069e26b9be18c60d624d" FOREIGN KEY ("admId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_book" ADD CONSTRAINT "FK_38c6ca6e7bae720f5fafa36a2ed" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_book" ADD CONSTRAINT "FK_9ed30ab082105a889d49197b0a3" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_a0f13454de3df36e337e01dbd55" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_a0f13454de3df36e337e01dbd55"`);
        await queryRunner.query(`ALTER TABLE "club_book" DROP CONSTRAINT "FK_9ed30ab082105a889d49197b0a3"`);
        await queryRunner.query(`ALTER TABLE "club_book" DROP CONSTRAINT "FK_38c6ca6e7bae720f5fafa36a2ed"`);
        await queryRunner.query(`ALTER TABLE "clubs" DROP CONSTRAINT "FK_7e3f571069e26b9be18c60d624d"`);
        await queryRunner.query(`ALTER TABLE "thread" DROP CONSTRAINT "FK_7060c5e0b10f141ce2ca501bc13"`);
        await queryRunner.query(`ALTER TABLE "thread" DROP CONSTRAINT "FK_8a5e72ea462c914e33d7cf97849"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b148d2f5a22e7904160c69b09f8"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_cdb22098ad875e1d2bf1d85556e"`);
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_bbd870a86349a44a70cf8364de6"`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP CONSTRAINT "FK_d7eee1e30ec6bd6dc4a58d7fa85"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "club_book"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
        await queryRunner.query(`DROP TABLE "thread"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_club"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
