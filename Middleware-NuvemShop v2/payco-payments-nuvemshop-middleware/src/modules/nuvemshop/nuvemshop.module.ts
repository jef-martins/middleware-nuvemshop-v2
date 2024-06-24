import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigType } from "@nestjs/config";
import nuvemshopConfig from "@/config/nuvemshop.config";
import { NuvemshopService } from "@/modules/nuvemshop/nuvemshop.service";

@Module({
  imports: [
    ConfigModule.forFeature(nuvemshopConfig),
    HttpModule.registerAsync({
      inject: [nuvemshopConfig.KEY],
      imports: [ConfigModule.forFeature(nuvemshopConfig)],
      useFactory: (config: ConfigType<typeof nuvemshopConfig>) => ({
        timeout: config.timeout,
      }),
    }),
  ],
  controllers: [],
  providers: [NuvemshopService],
  exports: [NuvemshopService],
})
export class NuvemshopModule { }
