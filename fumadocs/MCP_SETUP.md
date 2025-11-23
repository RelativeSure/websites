# MCP Server Setup for Fumadocs Documentation

This document explains how to set up and use the Model Context Protocol (MCP) server to access your Fumadocs documentation.

## What is MCP?

The Model Context Protocol (MCP) allows AI assistants like Claude to access external data sources in a standardized way. This setup enables Claude to read and search through your Fumadocs documentation.

## Setup Instructions

### Option 1: Using with Claude Desktop (Recommended)

1. **Locate your Claude Desktop configuration file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add the MCP server configuration:**

   Open the configuration file and add the following to the `mcpServers` section:

   ```json
   {
     "mcpServers": {
       "fumadocs-filesystem": {
         "command": "npx",
         "args": [
           "-y",
           "@modelcontextprotocol/server-filesystem",
           "/home/user/websites/fumadocs/content/docs"
         ]
       }
     }
   }
   ```

   **Note:** Update the path `/home/user/websites/fumadocs/content/docs` to match your actual documentation directory path.

3. **Restart Claude Desktop** to apply the changes.

4. **Verify the setup:**
   - Open a new conversation in Claude Desktop
   - Look for the MCP icon or "Tools" section
   - You should see the `fumadocs-filesystem` server listed

### Option 2: Using with Claude Code

If you're using Claude Code, the MCP configuration is already set up in the root `mcp.json` file.

To use it:
1. Open Claude Code in this project
2. The MCP server will automatically be available
3. Claude will be able to read your documentation files

### Option 3: Using the Configuration File

You can also reference the `mcp.json` file at the root of this repository, which contains the full configuration.

## Available Capabilities

Once configured, the MCP server provides the following capabilities:

- **read_file**: Read any documentation file in the `content/docs` directory
- **list_directory**: List files and directories
- **get_file_info**: Get metadata about files
- **search_files**: Search for files by name or pattern

## Using the MCP Server

After setup, you can ask Claude to:

- "Read the content of the AI bookmarks page"
- "Show me all files in the linux directory"
- "Search for documentation about Kubernetes"
- "What's in the goodstuff/git.mdx file?"

Claude will use the MCP server to access your documentation and provide accurate answers.

## Troubleshooting

### Server not appearing in Claude Desktop

1. Make sure the configuration file path is correct
2. Verify the documentation directory path is absolute and exists
3. Restart Claude Desktop completely
4. Check Claude Desktop logs for any errors

### Permission errors

Make sure the path you specified has read permissions for the user running Claude.

### Server connection issues

The first time the server runs, it may take a moment to download and initialize via `npx`. This is normal.

## Package Information

- **Package**: `@modelcontextprotocol/server-filesystem`
- **Type**: Official MCP server
- **Maintained by**: Anthropic (Model Context Protocol team)
- **Repository**: [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

## Security Notes

- The MCP server only has read access to the specified directory
- It cannot write, modify, or delete files
- It cannot access files outside the specified path
- All operations are sandboxed to the documentation directory

## Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Filesystem Server Documentation](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- [Claude Desktop MCP Setup Guide](https://modelcontextprotocol.io/docs/tools/inspector)

## Extending the Setup

If you want to access other directories, you can add additional paths to the `args` array:

```json
{
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/home/user/websites/fumadocs/content/docs",
    "/home/user/websites/fumadocs/src"
  ]
}
```

This would grant access to both the documentation content and source code directories.
