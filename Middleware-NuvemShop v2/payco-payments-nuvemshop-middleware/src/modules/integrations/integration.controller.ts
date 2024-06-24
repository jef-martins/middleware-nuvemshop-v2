import { IntegrationService } from "@/modules/integrations/integration.service";
import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { CreateIntegrationDto } from "./dtos/create-integration.dto";

@Controller("integrations")
export class IntegrationController {

  constructor(
    private readonly integrationService: IntegrationService
  ) { }

  @Post("/install")
  async authorize(@Body() bodyParams: CreateIntegrationDto) {
    try {
      const integration = await this.integrationService.registerNuvemshopIntegration(bodyParams);

      return {
        ok: true,
        data: integration
      }
    } catch (err) {
      console.log(err)
      
      throw new HttpException({
        ok: false,
        error: {
          code: err.status,
          message: err.message
        }
      }, err.status);
    }
  }
}