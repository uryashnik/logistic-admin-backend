import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1773924429615 implements MigrationInterface {
    name = 'CreateOrders1773924429615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "tracking_number" character varying NOT NULL, "estimated_cost" integer NOT NULL, "pickup_address" character varying NOT NULL, "delivery_address" character varying NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'created', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "created_by" integer, "deleted_by" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_574a2f0932043d4e4baf188ee05" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_572f66f6bf7c808267421bf36c0" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_572f66f6bf7c808267421bf36c0"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_574a2f0932043d4e4baf188ee05"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
