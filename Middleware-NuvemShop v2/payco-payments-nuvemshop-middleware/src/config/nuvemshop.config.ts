import { registerAs } from "@nestjs/config";

export default registerAs("payments", () => ({
	baseUrl: process.env.NUVEMSHOP_BASE_URL,
	authUrl: process.env.NUVEMSHOP_AUTH_URL,
	timeout: Number(process.env.NUVEMSHOP_TIMEOUT),
	clientId: process.env.NUVEMSHOP_CLIENT_ID,
	clientSecret: process.env.NUVEMSHOP_CLIENT_SECRET,
}));
