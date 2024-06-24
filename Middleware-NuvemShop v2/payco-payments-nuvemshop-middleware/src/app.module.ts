import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "@/config/env.validation";
import { IntegrationModule } from "@/modules/integrations/integration.module";
import { NuvemshopModule } from "@/modules/nuvemshop/nuvemshop.module";
import { PaymentsModule } from "@/modules/payments/payments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IntegrationEntity } from "./modules/integrations/entity/integrations.entity";

@Module({
	imports: [
		PaymentsModule,
		NuvemshopModule,
		IntegrationModule,
		ConfigModule.forRoot({
			validate,
		}),
		TypeOrmModule.forRoot({ 
			type: 'postgres',
			database: process.env.DB_DATABASE,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			entities: [IntegrationEntity], 
			migrations: [`${__dirname}/migration/{.ts,*.js}`],
      		migrationsRun: true,
		}),
	]
})
export class AppModule { }
