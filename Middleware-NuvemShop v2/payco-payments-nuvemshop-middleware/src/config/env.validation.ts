import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";

enum Environment {
	Development = "development",
	Production = "production",
	Test = "test",
}

class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	PORT: number;

	@IsString()
	PAYMENTS_BASE_URL: string;

	@IsString()
	PAYMENTS_AUTH_URL: string;

	@IsNumber()
	PAYMENTS_TIMEOUT: number;

	@IsString()
	PAYMENTS_CLIENT_ID: string;

	@IsString()
	PAYMENTS_CLIENT_SECRET: string;

	@IsString()
	NUVEMSHOP_BASE_URL: string;

	@IsString()
	NUVEMSHOP_AUTH_URL: string;

	@IsNumber()
	NUVEMSHOP_TIMEOUT: number;

	@IsString()
	NUVEMSHOP_CLIENT_ID: string;

	@IsString()
	NUVEMSHOP_CLIENT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
