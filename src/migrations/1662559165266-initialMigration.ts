import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1662559165266 implements MigrationInterface {
    name = 'initialMigration1662559165266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "booksId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "author" character varying(50) NOT NULL, "categoryId" uuid, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("session_id" uuid NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, CONSTRAINT "PK_9340188c93349808f10d1db74a8" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`CREATE TABLE "user_club" ("id" uuid NOT NULL, "userId" uuid, "clubClubId" uuid, CONSTRAINT "PK_4f89a8eafafbd7c3193dcff66db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clubs" ("club_id" uuid NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "isActive" boolean NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865b9a142053b65722a64066698" PRIMARY KEY ("club_id"))`);
        await queryRunner.query(`CREATE TABLE "club_book" ("id" uuid NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "clubClubId" uuid, "bookId" uuid, CONSTRAINT "PK_127a5ce44229e0a8ae6657b8ff0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_21cabe5279bc83713bbf691c328" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_a0f13454de3df36e337e01dbd55" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_bbd870a86349a44a70cf8364de6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_club" ADD CONSTRAINT "FK_c74811d86354b86a6e1777f133f" FOREIGN KEY ("clubClubId") REFERENCES "clubs"("club_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_book" ADD CONSTRAINT "FK_b4d79fd075defe5f64d33768238" FOREIGN KEY ("clubClubId") REFERENCES "clubs"("club_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "club_book" ADD CONSTRAINT "FK_9ed30ab082105a889d49197b0a3" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "club_book" DROP CONSTRAINT "FK_9ed30ab082105a889d49197b0a3"`);
        await queryRunner.query(`ALTER TABLE "club_book" DROP CONSTRAINT "FK_b4d79fd075defe5f64d33768238"`);
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_c74811d86354b86a6e1777f133f"`);
        await queryRunner.query(`ALTER TABLE "user_club" DROP CONSTRAINT "FK_bbd870a86349a44a70cf8364de6"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_a0f13454de3df36e337e01dbd55"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_21cabe5279bc83713bbf691c328"`);
        await queryRunner.query(`DROP TABLE "club_book"`);
        await queryRunner.query(`DROP TABLE "clubs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_club"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
