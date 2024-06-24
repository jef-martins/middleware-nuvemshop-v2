import { IntegrationResponseDto } from "@/modules/payments/dtos/integration-response.dto";
import { RegisterIntegrationDto } from "@/modules/payments/dtos/register-integration.dto";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import paymentsConfig from "@/config/payments.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class PaymentsService {
	private readonly logger = new Logger(PaymentsService.name);

	constructor(
		private readonly httpService: HttpService,
		@Inject(paymentsConfig.KEY)
		private readonly config: ConfigType<typeof paymentsConfig>,
	) { }

	public async get() {

		const URL = `https://sso.payments.payco.com.br/realms/payco-payments`;
		const { data } = await firstValueFrom(
			this.httpService.get(URL).pipe(
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

	async registerIntegration(dto: RegisterIntegrationDto) {
		try {
			return {
				"ok": true,
				"data": {
					"id": "f7b3b1b1-4b3b-4b3b-4b3b-4b3b4b3b4b3b",
					"store_id": "123456",
					"store_name": "My Store",
					"store_url": "https://mystore.com"
				}
			}
		} catch {
			return {
				"ok": false,
				"error": {
					"code": "invalid_request",
					"message": "Invalid request"
				}
			}
		}

		
		
	}
}
