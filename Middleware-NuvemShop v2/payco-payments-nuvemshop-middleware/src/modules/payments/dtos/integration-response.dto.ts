import { IsString } from "class-validator";

export class IntegrationResponseDto {
	@IsString()
	readonly establishmentId: string;

	@IsString()
	readonly clientId: string;

	@IsString()
	readonly clientSecret: string;
}
