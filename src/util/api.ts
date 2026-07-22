import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "c773f5d46de208d2769eed40a465586431bad5e3";
let schema: OpenAPI.Document | undefined;

export const getSchema = async () => {
	if (!schema) {
		const response = await fetch(
			`https://gh-code.developers.cloudflare.com/cloudflare/api-schemas/${COMMIT}/openapi.json`,
		);
		const obj = await response.json();

		schema = await SwaggerParser.dereference(obj);
	}

	return schema;
};
