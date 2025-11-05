export default {
  async fetch(request: Request, env: any): Promise<Response> {
    // Serve static assets from the Next.js build
    return env.ASSETS.fetch(request);
  },
};
