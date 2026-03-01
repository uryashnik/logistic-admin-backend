import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleType } from '../enums';

export class CreateUsers1772360623011 implements MigrationInterface {
  name = 'CreateUsers1772360623011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("code" character varying NOT NULL, "label" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_f6d54f95c31b73fb1bdd8e91d0c" PRIMARY KEY ("code")); COMMENT ON COLUMN "roles"."code" IS 'Код ролі'`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" (code, label, description) VALUES ('${RoleType.Admin}', 'Administrator', 'System administrator with full access to all features and settings'), ('${RoleType.Manager}', 'Manager', 'Regular user with limited access to core functionality'), ('${RoleType.User}', 'User', 'User with access to TV screen features')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "updated_by" integer, "deleted_by" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (email, first_name, last_name, is_active, password) VALUES ('admin@gmail.com', 'admin', 'admin', true, '1q2w3e4r5t')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles" ("user_id" integer NOT NULL, "role_code" character varying NOT NULL, CONSTRAINT "PK_241018c221b4e81e63cc150376b" PRIMARY KEY ("user_id", "role_code"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d090de2b26fcff3121a1c78cc1" ON "users_roles" ("role_code") `);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_d090de2b26fcff3121a1c78cc14" FOREIGN KEY ("role_code") REFERENCES "roles"("code") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_d090de2b26fcff3121a1c78cc14"`);
    await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b75c92ef36f432fe68ec300a7d4"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f32b1cb14a9920477bcfd63df2c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d090de2b26fcff3121a1c78cc1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e4435209df12bc1f001e536017"`);
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
