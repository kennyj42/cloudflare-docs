import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPI } from "openapi-types";

const COMMIT = "b40729646a3b8c2fc9bd8a01c1d420f732a8339a";
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
