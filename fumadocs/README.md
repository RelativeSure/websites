# personal-fumadocs-site

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## MCP Server Setup

This project supports Model Context Protocol (MCP) servers that allow AI assistants like Claude to read and search your documentation.

### Option 1: Local MCP Server (Development)

For local development, use the filesystem server to access your documentation files:

**Configuration:**

Add this to your Claude Desktop config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fumadocs-filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/fumadocs/content/docs"
      ]
    }
  }
}
```

**Package**: [@modelcontextprotocol/server-filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)

### Option 2: Remote MCP Server (Hosted)

For remote access from anywhere, deploy an MCP server alongside your Cloudflare Workers site.

**Quick Deploy:**

The easiest option is to deploy [@arabold/docs-mcp-server](https://github.com/arabold/docs-mcp-server) on platforms like:
- **Fly.io** (Free tier: 3 shared VMs)
- **Render** (Free tier with sleep)
- **Railway** ($5 credit/month)
- **Cloudflare Workers** (Free tier: 100k requests/day)

**Claude Configuration:**

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

📖 **Full deployment guide**: See [REMOTE_MCP_DEPLOYMENT.md](./REMOTE_MCP_DEPLOYMENT.md) for detailed instructions, cost comparison, and deployment steps.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs
