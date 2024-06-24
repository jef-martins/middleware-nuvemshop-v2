import { IsString } from "class-validator";

export class RegisterIntegrationDto {
	@IsString()
	readonly document: string;

	@IsString()
	readonly store_id: number | string;

	@IsString()
	readonly website_url: string;

	@IsString()
	readonly active: boolean;
}
