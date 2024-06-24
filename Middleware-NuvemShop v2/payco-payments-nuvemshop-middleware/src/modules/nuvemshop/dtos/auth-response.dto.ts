import { IsString } from "class-validator";

export class AuthResponseDto {
	@IsString()
	readonly id: string;

	@IsString()
	readonly access_token: string;

	@IsString()
	readonly token_type: string;

	@IsString()
	readonly scope: string;

	@IsString()
	readonly user_id: string;
}
