import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrders1774037463941 implements MigrationInterface {
    name = 'UpdateOrders1774037463941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders_history" ("id" SERIAL NOT NULL, "carrier" character varying, "status" "public"."orders_history_status_enum" NOT NULL, "comment" character varying, "address_from" character varying, "address_to" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "order_id" integer, "created_by" integer, CONSTRAINT "PK_0053f303fce5fc77fed8f1095d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_history" ADD CONSTRAINT "FK_e69f337a6123047c80ed1df6d41" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_history" ADD CONSTRAINT "FK_8cf5ec253361ec0994eca46ac13" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_history" DROP CONSTRAINT "FK_8cf5ec253361ec0994eca46ac13"`);
        await queryRunner.query(`ALTER TABLE "orders_history" DROP CONSTRAINT "FK_e69f337a6123047c80ed1df6d41"`);
        await queryRunner.query(`DROP TABLE "orders_history"`);
    }

}
