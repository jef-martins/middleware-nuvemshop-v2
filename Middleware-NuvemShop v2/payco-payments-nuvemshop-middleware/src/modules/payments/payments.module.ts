import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigType } from "@nestjs/config";
import paymentsConfig from "@/config/payments.config";
import { PaymentsService } from "@/modules/payments/payments.service";

@Module({
  imports: [
    ConfigModule.forFeature(paymentsConfig),
    HttpModule.registerAsync({
      inject: [paymentsConfig.KEY],
      imports: [ConfigModule.forFeature(paymentsConfig)],
      useFactory: (config: ConfigType<typeof paymentsConfig>) => ({
        timeout: config.timeout,
      }),
    }),
  ],
  controllers: [],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule { }
