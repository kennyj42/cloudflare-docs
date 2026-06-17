import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "d74a1961fa701f8ff3b309042a0a5fe386739c26";
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
