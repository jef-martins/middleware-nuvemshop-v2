import { CreateIntegrationDto } from "@/modules/integrations/dtos/create-integration.dto";
import { NuvemshopService } from "@/modules/nuvemshop/nuvemshop.service";
import { PaymentsService } from "@/modules/payments/payments.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IntegrationEntity } from "./entity/integrations.entity";
import { Repository } from "typeorm";
import { PAYMENT_PROVIDER } from "./integartion.constants";

@Injectable()
export class IntegrationService {

  constructor(
    private readonly nuvemshopService: NuvemshopService,
    private readonly paymentsService: PaymentsService,
    @InjectRepository(IntegrationEntity)
    private readonly integrationEntity: Repository<IntegrationEntity>
  ) { }

  async registerNuvemshopIntegration(dto: CreateIntegrationDto) {
    const authorization = await this.nuvemshopService.authorizeToken({
      code: dto.nuvemshop_code
    });

    // const authorization = {
    //   access_token: "57c5904234ccfdd5ce25e025efe2ff6ac53b2184",
    //   user_id: "4368719"
    // }

    const findStore = await this.integrationEntity.findOne({ where: { store_id: Number(authorization.user_id) } })
    
    if (findStore) {
      throw new HttpException('A loja já existe no banco de dados', HttpStatus.CONFLICT);
    }

    const store = await this.nuvemshopService.get({
      token: authorization.access_token,
      store_id: authorization.user_id
    }) 

    
    const providerPayment = await this.nuvemshopService.post({
      ...PAYMENT_PROVIDER,
      token: authorization.access_token,
      store_id: store.id.toString()
    })

    const saveIntegration = await this.integrationEntity.save({
      establishment_id: dto.establishment_id,
      client_id: dto.client_id,
      client_secret: dto.client_secret,
      nuvemshop_token: authorization.access_token,
      store_id: store.id,
      payment_provider_id: providerPayment.id,
      created_at: new Date(),
      updated_at: new Date()
    })

    return {
      id: saveIntegration.id,
      store_id: store.id,
      store_name: store.name.pt,
      store_url: store.original_domain,
    }
  }
}
