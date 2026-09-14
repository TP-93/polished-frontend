/**
 * Server-only GraphQL client for the JORCUSTOM backend.
 *
 * The staging API sits behind a basic-auth gate, so every call runs on the
 * server and the credentials never reach the browser.
 */

export async function jcGraphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const url = process.env["JC_GRAPHQL_URL"] ?? "https://staging.jorcustom.com/graphql/";
  const basic = process.env["JC_BASIC_AUTH"];

  const headers: Record<string, string> = { "content-type": "application/json" };
  if (basic) headers["Authorization"] = `Basic ${btoa(basic)}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (!payload.data) {
    throw new Error(payload.errors?.[0]?.message ?? `GraphQL request failed (${response.status})`);
  }
  return payload.data;
}

export function mediaBase() {
  return process.env["JC_MEDIA_BASE"] ?? "https://staging.jorcustom.com/media/";
}
