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
    if (response.status === 404) {
      const path = url.pathname;
      const hasFileExtension = /\.[a-z0-9]+$/i.test(path);

      // Serve index.html for routes without file extensions
      if (!hasFileExtension) {
        const indexRequest = new Request(
          new URL('/index.html', request.url),
          request
        );
        return env.ASSETS.fetch(indexRequest);
      }
    }

    return response;
  },
};
