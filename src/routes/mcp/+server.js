// Public MCP endpoint: https://kgromero.com/mcp
// Forwards to the Python MCP server on Fly.io (https://github.com/romero927/kgromero-mcp),
// so clients only ever see this domain. Runs as a Netlify function, not prerendered.
export const prerender = false;

const UPSTREAM = "https://kgromero-mcp.fly.dev/mcp";

// Request headers the MCP Streamable HTTP transport uses
const FORWARD = ["content-type", "accept", "mcp-protocol-version", "mcp-session-id", "last-event-id"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

/** @param {Request} request */
async function proxy(request) {
  const headers = new Headers();
  for (const name of FORWARD) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  let upstream;
  try {
    upstream = await fetch(UPSTREAM, {
      method: request.method,
      headers,
      body: request.method === "POST" ? await request.text() : undefined,
    });
  } catch {
    return new Response(
      JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32000, message: "MCP server unavailable" } }),
      { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
    );
  }

  const out = new Headers(CORS);
  for (const name of ["content-type", "mcp-session-id", "mcp-protocol-version", "allow"]) {
    const value = upstream.headers.get(name);
    if (value) out.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers: out });
}

/** @type {import('./$types').RequestHandler} */
export function GET({ request }) {
  // Someone opened the URL in a browser: show the setup instructions instead.
  if (request.headers.get("accept")?.includes("text/html")) {
    return new Response(null, { status: 302, headers: { Location: "/api-docs#mcp" } });
  }
  return proxy(request);
}

/** @type {import('./$types').RequestHandler} */
export const POST = ({ request }) => proxy(request);

/** @type {import('./$types').RequestHandler} */
export const DELETE = ({ request }) => proxy(request);

/** @type {import('./$types').RequestHandler} */
export const OPTIONS = () => new Response(null, { status: 204, headers: CORS });
