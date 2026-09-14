import { createFileRoute } from "@tanstack/react-router";

// Server-side proxy for the JORCUSTOM GraphQL backend. Keeps the staging basic
// auth credentials on the server; the browser only ever talks to /api/graphql.
export const Route = createFileRoute("/api/graphql")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const endpoint = process.env["JC_GRAPHQL_URL"];
        const basicAuth = process.env["JC_BASIC_AUTH"];

        if (!endpoint) {
          return Response.json({ errors: [{ message: "GraphQL endpoint not configured" }] }, { status: 500 });
        }

        const headers = new Headers({
          "content-type": request.headers.get("content-type") ?? "application/json",
          accept: "application/json",
        });

        const authorization = request.headers.get("authorization");
        if (authorization) headers.set("x-jc-authorization", authorization);
        if (authorization) headers.set("authorization", authorization);
        if (basicAuth) {
          headers.set(
            authorization ? "x-basic-authorization" : "authorization",
            basicAuth.startsWith("Basic ") ? basicAuth : `Basic ${basicAuth}`,
          );
        }

        const body = await request.text();

        const upstream = await fetch(endpoint, { method: "POST", headers, body });
        const text = await upstream.text();

        return new Response(text, {
          status: upstream.status,
          headers: {
            "content-type": upstream.headers.get("content-type") ?? "application/json",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
