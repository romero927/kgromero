import { json } from "@sveltejs/kit";
import { openApiSpec } from "$lib/openapi.js";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
  };

  return json(openApiSpec, { headers });
}
