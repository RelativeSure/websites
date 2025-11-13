interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Try to serve the requested asset
    const response = await env.ASSETS.fetch(request);

    // If asset not found and request looks like a SPA route (no file extension),
    // serve index.html to let client-side router handle it
    // Only apply fallback for GET/HEAD methods to avoid consuming request body
    if (response.status === 404 && (request.method === "GET" || request.method === "HEAD")) {
      const path = url.pathname;
      const hasFileExtension = /\.[a-z0-9]+$/i.test(path);

      // Serve index.html for routes without file extensions
      if (!hasFileExtension) {
        return env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
      }
    }

    return response;
  },
};
