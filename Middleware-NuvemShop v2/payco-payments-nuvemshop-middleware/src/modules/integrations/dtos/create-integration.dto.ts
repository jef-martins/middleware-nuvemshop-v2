import { IsString } from "class-validator";

export class CreateIntegrationDto {
  @IsString()
  readonly nuvemshop_code: string;

  @IsString()
  readonly client_id: string;

  @IsString()
  readonly client_secret: string;

  @IsString()
  readonly establishment_id: string;

}