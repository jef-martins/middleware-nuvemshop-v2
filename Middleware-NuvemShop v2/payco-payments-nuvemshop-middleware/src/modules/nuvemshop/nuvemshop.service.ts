import nuvemshopConfig from "@/config/nuvemshop.config";
import { AuthResponseDto } from "@/modules/nuvemshop/dtos/auth-response.dto";
import { AuthorizeCodeDto } from "@/modules/nuvemshop/dtos/authorize-code.dto";
import { GetStoreDto } from "@/modules/nuvemshop/dtos/get-store.dto";
import { NuvemshopStore } from "@/modules/nuvemshop/entities/store.entity";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosError } from "axios";
import { firstValueFrom, catchError } from "rxjs";
import { PaymentIntegration } from "./dtos/provider-payment.dto";

@Injectable()
export class NuvemshopService {
  private readonly logger = new Logger(NuvemshopService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(nuvemshopConfig.KEY)
    private readonly config: ConfigType<typeof nuvemshopConfig>,
  ) { }

  public async get(dto: GetStoreDto) {
    const URL = `${this.config.baseUrl}/v1/${dto.store_id}/store`;
    const { data } = await firstValueFrom(
      this.httpService.get<NuvemshopStore>(URL, {
        headers: {
          Authentication: `bearer ${dto.token}`,
        }
      }).pipe(
        catchError((error: AxiosError) => {
          const errorMessage = `[${error.response.status}]: ${JSON.stringify(error.response.data)}`;
          this.logger.error(
            `[${error.response.status}]: ${error.response.data}`,
          );
          throw new Error(errorMessage);
        }),
      ),
    );
    return data;
  }

  public async post(dto: PaymentIntegration) {
    const URL = `${this.config.baseUrl}/v1/${dto.store_id}/payment_providers`;
    const { data } = await firstValueFrom(
      this.httpService.post<AuthResponseDto>(URL, dto,{
        headers: {
          Authentication: `bearer ${dto.token}`,
        }
      }).pipe(
        catchError((error: AxiosError) => {
          const errorMessage = `[${error.response.status}]: ${error.response.data}`;
          this.logger.error(
            `[${error.response.status}]: ${error.response.data}`,
          );
          throw new Error(errorMessage);
        }),
      ),
    );
    return data;
  }

  public async authorizeToken(dto: AuthorizeCodeDto) {
    const URL = `${this.config.authUrl}/apps/authorize/token`;
    const { data } = await firstValueFrom(
      this.httpService.post<AuthResponseDto>(URL, {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: "authorization_code",
        code: dto.code,
      }).pipe(
        catchError((error: AxiosError) => {
          const errorMessage = `[${error.response.status}]: ${error.response.data}`;
          this.logger.error(
            `[${error.response.status}]: ${error.response.data}`,
          );
          throw new Error(errorMessage);
        }),
      ),
    );
    return data;
  }
}
