import { IsString } from "class-validator";

export class AuthorizeCodeDto {
	@IsString()
	readonly code: string;
}
