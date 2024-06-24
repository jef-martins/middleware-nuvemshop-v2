import { registerAs } from "@nestjs/config";

export default registerAs("payments", () => ({
	baseUrl: process.env.PAYMENTS_BASE_URL,
	authUrl: process.env.PAYMENTS_AUTH_URL,
	timeout: Number(process.env.PAYMENTS_TIMEOUT),
	clientId: process.env.PAYMENTS_CLIENT_ID,
	clientSecret: process.env.PAYMENTS_CLIENT_SECRET,
}));
