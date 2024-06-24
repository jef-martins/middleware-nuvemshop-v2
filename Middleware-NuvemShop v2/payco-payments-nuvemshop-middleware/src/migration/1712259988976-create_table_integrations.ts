import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableIntegrations1712259988976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE integrations (
                id SERIAL PRIMARY KEY,
                establishment_id VARCHAR(255) NOT NULL,
                client_id VARCHAR(255) NOT NULL,
                client_secret VARCHAR(255) NOT NULL,
                nuvemshop_token VARCHAR(255) NOT NULL,
                store_id INT NOT NULL,
                payment_provider_id VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL
            );
        
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.integrations
        `);
    }

}
