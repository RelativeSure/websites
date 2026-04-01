# Remote MCP Server Deployment Guide

This guide explains how to deploy a remote MCP server for your Fumadocs documentation that can be accessed from Claude CLI/Desktop from anywhere.

## Overview

Instead of running the MCP server locally, you can deploy it as a remote service that:
- Runs 24/7 in the cloud
- Is accessible from any Claude client via HTTPS
- Automatically crawls and indexes your Fumadocs site
- Connects via SSE (Server-Sent Events) transport

## Recommended Solution: @arabold/docs-mcp-server

This is a production-ready MCP server specifically designed for documentation sites, including Fumadocs.

### Deployment Options

#### Option 1: Docker (Railway, Render, Fly.io)

**1. Create a `Dockerfile` in a new directory:**

```dockerfile
FROM node:20-alpine

# Install the docs MCP server
RUN npm install -g @arabold/docs-mcp-server@latest

# Expose the default port
EXPOSE 6280

# Run the server
CMD ["npx", "@arabold/docs-mcp-server", "--protocol", "http", "--host", "0.0.0.0", "--port", "6280"]
```

**2. Deploy to your platform of choice:**

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create new project
railway login
railway init
railway up

# Your server will be available at https://your-app.up.railway.app
```

**Render:**
- Go to render.com
- New → Web Service
- Connect your GitHub repo
- Select "Docker"
- Deploy

**Fly.io:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch
fly deploy

# Your server will be at https://your-app.fly.dev
```

#### Option 2: Cloudflare Workers (Advanced)

For Cloudflare Workers, you'll need to create a custom MCP server that fetches documentation from your deployed site or KV storage. This is more complex but keeps everything on Cloudflare.

**Steps:**
1. Use `npm create cloudflare@latest` with MCP template
2. Implement tools to fetch docs from your Fumadocs site URL
3. Deploy with `wrangler deploy`

See [Cloudflare MCP Documentation](https://developers.cloudflare.com/agents/guides/remote-mcp-server/) for details.

## Cost Comparison

| Platform | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Railway** | $5 credit/month | ~$5/month | Easy deployment |
| **Render** | Yes (sleeps) | $7/month | Free hobby projects |
| **Fly.io** | 3 shared VMs | Pay as you go | Generous free tier |
| **Cloudflare Workers** | 100k req/day | $5/month (Paid plan) | Already using CF |

**Recommendation**: For personal use, **Fly.io** or **Render free tier** should be sufficient.

## Connecting from Claude

Once deployed, add this to your Claude Desktop config:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fumadocs-remote": {
      "type": "sse",
      "url": "https://your-deployed-server.com/sse"
    }
  }
}
```

For HTTP transport (newer):
```json
{
  "mcpServers": {
    "fumadocs-remote": {
      "type": "http",
      "url": "https://your-deployed-server.com/mcp"
    }
  }
}
```

## Configuration

### @arabold/docs-mcp-server Configuration

Set these environment variables in your deployment:

```bash
# Your Fumadocs site URL
DOCS_URL=https://your-fumadocs-site.workers.dev

# Optional: Enable vector search with OpenAI
OPENAI_API_KEY=sk-...

# Optional: Authentication
AUTH_TOKEN=your-secret-token
```

## Testing Your Deployment

1. **Check if the server is running:**
   ```bash
   curl https://your-server.com/health
   ```

2. **Test the SSE endpoint:**
   ```bash
   curl https://your-server.com/sse
   ```

3. **Use MCP Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector https://your-server.com/mcp
   ```

## Security Considerations

### Option 1: No Authentication
- Simple, works immediately
- Only use if URL is hard to guess or for personal projects
- Can be behind a firewall

### Option 2: Token Authentication
Add authentication token to your deployment:

```json
{
  "mcpServers": {
    "fumadocs-remote": {
      "type": "sse",
      "url": "https://your-server.com/sse",
      "headers": {
        "Authorization": "Bearer your-secret-token"
      }
    }
  }
}
```

### Option 3: OAuth (Cloudflare Workers)
Use Cloudflare's OAuth templates for production-grade authentication.

## Maintenance

### Updating the Server

**Docker deployments:**
```bash
# Pull latest image and redeploy
docker pull ghcr.io/arabold/docs-mcp-server:latest
# Redeploy on your platform
```

**Cloudflare Workers:**
```bash
wrangler deploy
```

### Monitoring

Most platforms provide built-in monitoring:
- Railway: Built-in metrics
- Render: Logs and metrics dashboard
- Fly.io: `fly logs`
- Cloudflare: Workers Analytics

## Troubleshooting

### Server not responding
1. Check deployment logs
2. Verify the port is exposed (6280 for docs-mcp-server)
3. Ensure health endpoint returns 200

### Can't connect from Claude
1. Verify the URL is accessible from your machine
2. Check for CORS issues (shouldn't affect SSE)
3. Try both `/sse` and `/mcp` endpoints

### Documentation not loading
1. Verify your Fumadocs site is publicly accessible
2. Check the DOCS_URL environment variable
3. Review server logs for crawling errors

## Next Steps

1. Choose a deployment platform
2. Deploy using one of the methods above
3. Configure Claude to connect to your remote server
4. Test by asking Claude about your documentation

For more information:
- [@arabold/docs-mcp-server](https://github.com/arabold/docs-mcp-server)
- [Cloudflare MCP Documentation](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
