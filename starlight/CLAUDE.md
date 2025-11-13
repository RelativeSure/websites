# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the site (runs astro check first, then astro build)
- `pnpm preview` - Preview the built site
- `pnpm check` - Run Astro type checking
- `pnpm cfpreview` - Preview using Cloudflare Wrangler (serves ./dist)
- `pnpm cfdeploy` - Deploy to Cloudflare Pages

## Architecture

This is a personal documentation site built with Astro and Starlight, serving as both a CV and knowledge base. Key architectural components:

### Core Stack
- **Astro** - Static site generator with SSG
- **Starlight** - Documentation theme providing sidebar navigation, search, and content structure
- **React** - For interactive UI components (minimal usage)
- **TypeScript** - Strict mode enabled with path aliases (`@/*` maps to `./src/*`)
- **Tailwind CSS** - Styling with Starlight integration
- **MDX** - Enhanced Markdown for content

### Content Structure
- All content lives in `src/content/docs/` as MDX files
- Starlight auto-generates sidebar navigation from directory structure
- Content collections defined in `src/content.config.ts` using Starlight's loader/schema
- Six main content sections: Bookmarks, Good Stuff, Linux, Projects, Website, Windows

### Key Files
- `astro.config.mjs` - Main configuration with Starlight setup, sidebar structure, and social links
- `src/content.config.ts` - Content collections using Starlight's docs loader
- `src/components/MyLinkGrid.astro` - Reusable component for link grids with TypeScript interfaces
- `src/lib/utils.ts` - Utility functions (currently just `cn()` for class merging)

### Deployment
- **Cloudflare Pages** deployment via Wrangler
- Build output goes to `./dist`
- Node.js 24+ and pnpm 10+ required
- Renovate configured for automated dependency updates

### Styling Approach
- Starlight provides base theme with custom CSS in `src/styles/global.css`
- Tailwind integration via `@astrojs/starlight-tailwind` plugin
- Material Ocean/Lighter themes for code blocks

The site prioritizes content organization and documentation structure over complex interactivity, making it straightforward to add new content by creating MDX files in the appropriate directory.
