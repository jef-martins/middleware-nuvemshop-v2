import { IsString } from "class-validator";

export class GetStoreDto {
	@IsString()
	readonly token: string;

	@IsString()
	readonly store_id: string;
}
