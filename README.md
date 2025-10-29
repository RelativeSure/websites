# Websites Monorepo

A simple monorepo for managing multiple documentation and website projects.

## Structure

```
websites/
├── starlight/    # Starlight (Astro) based website
├── fumadocs/     # Fumadocs (Next.js) based website
└── ...           # Add more websites as needed
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

From the root directory:

```bash
npm install
```

This will install dependencies for all workspaces.

## Adding a New Website

1. Navigate to the appropriate directory under `websites/`
2. Import or initialize your website project there
3. The monorepo workspace configuration will automatically recognize it

### Example: Adding a Starlight Project

```bash
cd websites/starlight
npm create astro@latest -- --template starlight
```

### Example: Adding a Fumadocs Project

```bash
cd websites/fumadocs
# Follow the official Fumadocs installation guide at:
# https://fumadocs.vercel.app/docs/getting-started
npx create-fumadocs-app@latest
```

## Working with Individual Projects

Navigate to any website directory and use its standard commands:

```bash
cd websites/starlight
npm run dev          # Start development server
npm run build        # Build for production
```

## Workspace Benefits

- **Shared Dependencies**: Common dependencies are hoisted to the root
- **Isolated Projects**: Each website maintains its own configuration
- **Simple Structure**: Easy to add, remove, or migrate projects
- **Flexible**: Works with any npm-compatible project

## Available Websites

- **Starlight**: For building documentation sites with Astro
- **Fumadocs**: For building documentation with Next.js

## Tips

- Each website directory contains its own README with specific instructions
- You can use any package manager (npm, yarn, pnpm) - workspace features work with all
- Projects can be developed independently or together
- Simply copy/paste existing projects into the appropriate directories
