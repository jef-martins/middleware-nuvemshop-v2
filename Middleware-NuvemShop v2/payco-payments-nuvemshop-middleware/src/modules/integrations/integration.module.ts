import { IntegrationController } from "@/modules/integrations/integration.controller";
import { IntegrationService } from "@/modules/integrations/integration.service";
import { NuvemshopModule } from "@/modules/nuvemshop/nuvemshop.module";
import { PaymentsModule } from "@/modules/payments/payments.module";
import { Module } from "@nestjs/common";
import { IntegrationEntity } from "./entity/integrations.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [NuvemshopModule, PaymentsModule, TypeOrmModule.forFeature([IntegrationEntity])],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule { }